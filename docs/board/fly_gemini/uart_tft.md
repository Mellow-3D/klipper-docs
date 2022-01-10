### 概述
串口屏和12864都可以连接到super8

### Board.txt 准备
要使屏幕正常工作，需要将以下几行添加到 board.txt 文件中。
```
serial.aux.rxTxPins = {A.10, A.9}
```

![fly7寸屏接线](../../images/fly_screen_7.jpg)

请注意 5v（连接到 NC）、TX、RX 和 0v 的引脚排列。
附赠的连接线可能配备了用于duet板的正确连接，因此需要更改插头以适合这些板。请记住确保交叉 TX 和 RX。

使用 SD 卡右侧插座上的引脚 +5V、GND、TX 和 RX。这些应该连接到 Fly屏幕 上的 +5V、GND、TX 和 RX，确保 TX 和 RX 交叉。

在 config.g 中，应添加以下命令。

```
M575 P1 S0 B57600
```
