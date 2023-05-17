# 常见问题

> 欢迎各位提交PR

## Klipper常见报错


<!-- tabs:start -->

#### **问**

**Option `'xxxx1'` in section `'xxxx2'` must be specified**

#### **答**

* 这个报错是指在`[xxxx2]`配置节点下没有找到必填的配置项`xxxx1`
* 只需要在`[xxxx2]`节点下加入一行配置，`xxxx1: xx`。
* 具体的值请参照报错的配置项在klipper官方文档搜索

<!-- tabs:end -->

---

<!-- tabs:start -->

#### **问**

**MCU `'XXX'` shutdown: Missed schedulingof next digital out event**

**This is generally indicative of anintermittent communication failure between micro-controller and host.**

#### **答**

* 这个报错是指mcu`[xxx]`与上位机之间存在间歇性通信故障。
* 通常发生在使用CAN总线与工具头板之间
* 请先通过下面的方法排查是否为CAN总线通信带宽不足

1. 使用klipper自带的脚本来生成负载图

    安装依赖包
    ```bash
    sudo apt-get update
    sudo apt-get install python3-matplotlib
    ```

    生成负载图
    ```bash
    python3 ~/klipper/scripts/graphstats.py ~/printer_data/logs/klippy.log -o ~/printer_data/gcodes/loadgraph.png
    ```

    如果没有任何输出则生成成功，浏览器打印机控制页面，打开任务选项卡，将负载图loadgraph.png下载到本地以便查看

    ![down](../../images/guides/what/2/downloadgraph.png)
----
2. 查看负载图

    ![load](../../images/guides/what/2/loadgraph.png)

    从上图可以看出，Bandwidth通信带宽曲线有明显冲高
----
3. 提高CAN总线速率来解决带宽不足的问题

    查看当前速率
    ```bash
    ip -details link show can0 | grep bitrate | awk '{printf "\n" $2 "\n\n"}'
    ```

    如果是`500000`则要修改为`1000000`，如果是`250000`则修改为`500000`

    修改很简单

    重新按这里操作一次 [CAN使用](/advanced/can_rpi?id=%e5%87%86%e5%a4%87)

    注意：需要将里面命令中出现的所有`500000` 修改为你要修改的速率后再执行

    操作完重启后需要将所有使用CAN连接的主板固件重新编译烧录，编译配置中修改CAN速率

    再次查看速率是否修改成功

<!-- tabs:end -->

---