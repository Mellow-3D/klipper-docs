# 安装  **BDsensor**

## 将传感器电缆连接到主板或CAN总线工具头板。

BDsensor的CKL和SDA线可以连接到电路板的任何GPIO引脚。您也可以将BD传感器电缆直接连接到Bltouch端口，例如：

```
BLtouch    |    BDsensor
 5V       -->     5V
 GND      -->     GND
 S        -->     CLK/SCL    (Input)
 GND      -->     GND
 Zmin     -->     SDA    (Input/Output) 
```

由于主板连接器中的某些引脚可能没有直接连接到MCU的gpios（例如，它们上可能有滤波电容器或通过MOSFET，二极管或光耦合器隔离，但如果它们通过电阻或电阻上拉/下拉隔离也可以），因此它们不能与BDsensor一起使用。并且固件将报告连接错误。例如

- 风扇和加热器的连接器通过 MOSFET 隔离，
- 某些电路板中用于温度热敏电阻和端挡/探头的连接器通常通过滤波电容器连接到 GND，

1. 如下图所示，将BD传感器安装在靠近热端的位置。 [STL of mount](https://www.thingiverse.com/thing:6098131),  [STL_mount_VzBot_Goliath short](https://discord.com/channels/829828765512106054/1163237892957671424)

![img](https://raw.githubusercontent.com/markniu/Bed_Distance_sensor/new/doc/images/Connection1.jpg)

## 将补丁安装到 Marlin 固件

BD传感器已集成到Marlin2.1.x（自2022.8.27起），

您可以下载发布版本。但现在建议下载最新的错误修复版本：https://github.com/MarlinFirmware/Marlin

您需要的是更改配置文件和引脚文件。

### 编辑配置.h

1. 启用BD_SENSOR

取消注释

```
#define BD_SENSOR`
`#define Z_SAFE_HOMING
#define BD_SENSOR_PROBE_NO_STOP //adding this new line for fast bed leveling without nozzle stop, 
```

仅是`BD_SENSOR_PROBE_NO_STOP`

最新马林鱼错误修复：https://github.com/MarlinFirmware/Marlin

描述： https://github.com/MarlinFirmware/Marlin/pull/25847

2. 用探头归位

确保Z_MIN_PROBE_USES_Z_MIN_ENDSTOP_PIN已禁用，并且应按如下所示启用`USE_PROBE_FOR_Z_HOMING`

```
//#define Z_MIN_PROBE_USES_Z_MIN_ENDSTOP_PIN
// Force the use of the probe for Z-axis homing
#define USE_PROBE_FOR_Z_HOMING
```



3. 减慢第二个归位Z速度

```
#define Z_PROBE_FEEDRATE_SLOW (Z_PROBE_FEEDRATE_FAST / 16)
```

在这里，我们必须减慢凸块归位速度和Z归位速度，因为从BDsensor进程读取的止动器不像正常的止动器那样实时。

### 编辑Configuration_adv.h

`#define BABYSTEPPING`启用此功能以实现实时调平功能

```
#define HOMING_BUMP_DIVISOR { 2, 2, 8 }       // Re-Bump Speed Divisor (Divides the Homing Feedrate)
```

### 编辑pins_boardname.h

通过添加以下 3 行，在引脚文件 pins_boardname.h 中配置 BDsensor 的 SDA 和 SCL 的引脚（例如 ）：`pins_PANDA_PI_V29.h`

```
#define  I2C_BD_SDA_PIN    PC6   // Please change to the actual number which the SDA wire is connected to your mainboard
#define  I2C_BD_SCL_PIN    PB2   // Please change to the actual number which the SLK wire is connected to your mainboard
#define  I2C_BD_DELAY  20      // default value is 20, should be in the range [20,50].
```

如果您想像普通的BLtouch一样在打印前做自动床调平探头（G29）， 取消注释

```
#define AUTO_BED_LEVELING_BILINEAR
```

并编辑如下所示的值

```
#define Z_CLEARANCE_DEPLOY_PROBE   0 // Z Clearance for Deploy/Stow
#define Z_CLEARANCE_BETWEEN_PROBES  1 // Z Clearance between probe points
#define Z_CLEARANCE_MULTI_PROBE     1 // Z Clearance between multiple probes
```

在配置中。

## 在液晶屏上显示BD传感器值

对于打印机具有状态显示（支持 gcode M117），如LCD12864或一些 uart 屏幕，如 ender3V2 ...

## 校准

1. 清洁喷嘴，然后手动移动Z轴，直到喷嘴刚好接触床板（BDsensor会用这个位置作为0点，所以不需要z_offset，我们把值设置为0）。
2. 发送gcode命令`M102 S-6`，打印机每次将Z轴缓慢向上移动0.1mm，直到达到4mm。请勿在安装传感器之前运行M102 S-6，也不要在校准时关闭打印机电源，否则旧的校准数据将被删除。如果在这种情况下，只需再次校准

3. 您可以发生`M102 S-5`检查BD传感器是否已校准成功，这将返回存储在BD传感器中的原始校准数据。

还有一个校准工具可以做到这一点：https://github.com/markniu/Bed_Distance_sensor/raw/new/marlin/BD_Config_Tool_Marlin.zip ![img](https://raw.githubusercontent.com/markniu/Bed_Distance_sensor/main/doc/images/Read.jpg)

注意：数据值 1015 或 > 1010 表示超出传感器范围。如果前5点（0~0.5mm）或更多的值在0到1000的范围内，并且增加的值delta为>=10，则表示校准成功。就像上面显示的图表一样。

如果 M102 S-5 返回的第一个原始校准数据大于 400，则意味着传感器安装得太高，需要重新安装到更靠近床的位置。还要确保第二个数据比第一个数据值大 10 个以上

## 测试和打印

菜单床层

自动床位

## 有两种方法可以自动调平床：

**1.使用M102实时调平前几层**

我们可以通过发送 gcode 命令或在 gcode 文件中添加 gcode 来轻松启用或禁用此自动级别。

要在库拉中启用床位调平，请在打印机机器设置的“启动 G 代码”部分中的 G102（主页所有轴）G 代码正下方添加 M28 G 代码。 例如，在G28以下，这意味着它只会在Z轴高度的0.2mm以下进行床位调平。`M102 S2`

发送或将使用BD传感器禁用床位，顺便说一句，默认情况下禁用。`M102 S0``G28``M18`

```
M102   S-1     //Read sensor information, and we can use this for connection checking.
M102   S-2     //Read current distance value
M102   S-5     //Read raw Calibrate data
M102   S-6     //Start Calibrate,before that make sure the nozzle is just touched the bed,and then the printer restarted. don't home z axis before this.
M102   S4      //Set the adjustable Z height value,e.g. M102 S4  means it will do adjusting while the Z height <=0.4mm , disable it by M102 S0.
```

**2. G29自动调平床**

另一种自动调平床的方法就像 G29 的 BLtouch，只需在 G29 下方添加一条线 G28。

[安装视频](https://www.pandapi3d.com/post/install-bed-distance-sensor-video)

[克里斯地下室的安装视频](https://youtu.be/VLUfvkO2NFc?si=PF_6nhw39KhHBhcj)

### 检查 Z 端挡块`M119`

在检查此步骤之前，请不要归位Z，否则喷嘴可能会兑现打印机床。

这是发送 M119 命令（报告结束停止状态）后的返回消息。

```
Send: M119
Recv: x:open y:open z:open
```

如果 z min 未打开，请检查您的配置。`#define Z_MAX_ENDSTOP_HIT_STATE HIGH`

- 确保Z电机关闭/解锁
- 用手向下移动Z轴，直到喷嘴关闭床
- 发送`M102 S-2`，返回值应为0.00mm，然后再次发送M119，可以看到z端挡现在被触发。

```
Send: M119
Recv: x:open y:open z:TRIGGERED
```

### 检查连接

通过`M102 S-1`检查连接。这是返回消息的示例，请检查连接和电线顺序是否返回空白或其他字符串。

```
Send: M102 S-1
Recv: V1.0 pandapi3d.com
```



- 如果上述所有步骤都正确，那么您现在可以归位 z 轴。



