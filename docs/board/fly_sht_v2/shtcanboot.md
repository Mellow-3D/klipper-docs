# 更新CANBOOT

编译固件前请确保 [连接到SSH](/introduction/conntossh "点击即可跳转")

请使用**MobaXterm_Personal**等**SSH工具**连接通过**WIFI**到您的上位机，并且需要确定以下几点

1. **请确保上位机安装好了Klipper服务**
2. **请确保登录的用户必须是安装好Klipper的用户**
3. **请确保你的输入法是英文**
4. **请确保你的上位机可以正常搜索到设备**
5. **请确保以上注意事项都做到，否则无法进行下一步**

# 下载FLY_Katapult

* 执行下面命令下载固件包

```
cd && git clone https://github.com/FengHua741/FLY_Katapult.git
```

* 如果已经下载过固件包的建议更新固件包后在进行剩下操作

```
cd ~/FLY_Katapult && git pull
```

# 更新工具板Katapult固件

* 请注意需要Katapult固件更新原来的Katapult固件需要使用developer目录下的Katapult固件

* 此方法是直接通过CAN更新工具板原有的Katapult固件

```
 ~/klippy-env/bin/python ~/klipper/lib/canboot/flash_can.py -f <Update firmware path>  -u <Toolboard ID>
```

* 需要将`<Update firmware path>`替换成固件路径比如 `~/FLY_Katapult/developer/SHT36/FLY_SHT36V2_103_1M.bin`
* 需要将`<Toolboard ID>`替换成你的工具板ID比如说`72a773244776`

* 固件都在`FLY_Katapult\developer\SHT36`下可自行查看，刷写错会导致使用不了

* 下方是参考命令

```
 ~/klippy-env/bin/python ~/klipper/lib/canboot/flash_can.py -f ~/FLY_Katapult/developer/SHT36/FLY_SHT36V2_103_1M.bin  -u 72a773244776
```
