# 通过插件扩展驱动LED

需要通过ssh连接到上位机后按照下方链接进行安装与配置

```
https://github.com/julianschill/klipper-led_effect
```

## 安装

请使用**MobaXterm_Personal**等**SSH工具**连接通过**WIFI**到您的上位机，并且需要确定以下几点

1. **请确保上位机安装好了Klipper固件**
2. **请确保登录的用户必须是安装好Klipper的用户**
3. **请确保你的输入法是英文**
4. **请确保你的上位机可以正常搜索到设备**
5. **请确保以上注意事项都做到，否则无法进行下一步**

该模块可以使用安装脚本安装到现有的 Klipper 安装中。

```
cd ~
git clone https://github.com/julianschill/klipper-led_effect.git
cd klipper-led_effect
./install-led_effect.sh
```
