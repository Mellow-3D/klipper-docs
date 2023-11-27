# 用于 Klipper 的简单打印恢复系统

项目地址：[github](https://github.com/The--Captain/plr-klipper)

用于 Klipper 的简单打印恢复系统

Klipper 配置：

要安装，请将这些文件添加到 klipper 可以访问它们的位置。如果你没有主意，~/. 应该是一个很好的选择。然后，您必须添加 [include] 指令才能将 plr.cfg 的内容添加到打印机 .cfg 中，或者如果您不喜欢 [include] 指令，只需将其粘贴。
plr.sh 必须标记为可执行文件。此外，必须修改 plr.cfg 和 plr.sh 以反映虚拟 SD 卡在 Klipper 中的位置。

此外，必须将 Kiauh Gcode Shell 命令扩展添加到 Klipper 中。您不需要安装 Kiuah，但必须将gcode_shell_command.py添加到 klipper/klippy/extras 目录的内容中（扩展可以在此处下载：https://github.com/th33xitus/kiauh/blob/master/resources/gcode_shell_command.py )

最后，必须将其添加到起始 gcode（宏或切片器）的末尾：``SAVE_VARIABLE VARIABLE=was_interrupted VALUE=True``

这必须添加到结束 gcode（宏或切片器）的开头： ``SAVE_VARIABLE VARIABLE=was_interrupted VALUE=False``

切片器配置： 每次更改图层时，都必须从切片器调用 Klipper LOG_Z 宏。您无需花哨并指定任何参数。一旦调用宏，Klipper 将计算出当前的 Z。在 Cura 中，使用“在图层更改处插入”后处理器，选择“之前”选项，然后在要插入的 gcode 字段中键入“LOG_Z”（不带引号）。其他切片器的配置应类似

注意：此工具尝试在失败之前计算出打印的温度，从最不准确到最准确。它首先添加对 START_TEMPS 的调用（建议添加一个名为 START_TEMPS 的宏，将打印机加热到正常值）。然后，它会扫描 gcode 以查找打印失败之前的所有温度 gcode，并按该顺序添加它们。最后，在 Cura 的情况下，它会扫描 Cura 打印设置的结束 gcode，并从 Cura 打印设置中添加温度。

我确实相信 Kevin 没有提供 Power Loss Recovery 的原生实现的主要原因在很大程度上是由于对 SD 卡寿命的控制，因为 Klipper 通常从 RPI 上的 SD 卡运行。如果您担心这一点，建议将虚拟 SD 卡目录挂载到单独的一次性 SD 卡上，以节省用于 Klipper 发行版的主卡的磨损，然后配置 Klipper 保存的变量部分以使用虚拟 SD 卡目录

操作：

如果发生断电，请抬起打印头并清除/切断可能因故障而损坏的任何斑点。等待热端冷却，清洁喷嘴尖端，然后将喷嘴尖端放在打印件的最高点。轻轻触摸 - 龙门架应该仍然能够在打印件上移动，但会轻微刮擦。然后导航到 SD 卡菜单中的 gcode 文件，然后选择该文件。然后退出SD卡菜单并重新进入它（不知道如何刷新菜单）。菜单现在应包含“恢复失败”选项以恢复失败的打印。选择该选项。打印机应将轴归原，等待加热，然后恢复打印。

更精明的用户可以利用 RESUME_INTERRUPTED 宏，并使用文件名（以及完全限定的路径）指定 GCODE_FILE 参数来实现相同的目的。最高级的用户可以使用此宏来恢复由于灯丝跳动、热蠕变等原因而失败的打印。测量故障的高度，然后使用 RESUME_INTERRUPTED 宏，同时指定参数 Z_HEIGHT 以反映测量的高度。