/**
 * @fileoverview Klipper Firmware parse v1.0.0
 *
 * Copyright (c) 2024 XiaokkuiZhao xiaok@zxkxz.cn
 * All rights reserved, especially commercial rights.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are NOT permitted (except for personal, non-commercial use)
 * unless granted explicit written permission by the copyright holder.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */


const { createApp, ref } = Vue

createApp({
    setup() {
        const message = ref('固件信息');
        const infos = ref([]);
        const spi_infos = ref([]);
        const i2c_infos = ref([]);
        const initpins = ref([]);

        const compressedData = (data) => {
            let that = this;
            infos.value = [];
            spi_infos.value = [];
            i2c_infos.value = [];
            initpins.value = [];

            try {
                const decompressedData = pako.inflate(data);
                const decodedData = new TextDecoder().decode(decompressedData); // 如果是文本数据
                // console.log(decodedData);
                klipper_dict = JSON.parse(decodedData);
                // console.log(klipper_dict);

                const matchResult = klipper_dict.version.match(/-g([0-9a-f]{8})/i);
                var commitHash = '';
                if (matchResult && matchResult[1]) {
                    commitHash = matchResult[1]; // commitHash将等于'b98375b3'
                    // console.log(commitHash);
                }

                if (klipper_dict.hasOwnProperty("app")) {
                    infos.value.push({ "title": "APP程序", "info": klipper_dict.app });
                }
                if (klipper_dict.hasOwnProperty("license")) {
                    infos.value.push({ "title": "程序许可", "info": klipper_dict.license });
                }

                infos.value.push({ "title": "固件版本", "info": commitHash ? klipper_dict.version.replace(commitHash, "<a href='https://github.com/Klipper3d/klipper/commit/" + commitHash + "' target='_blank'>" + commitHash + "</a>") : klipper_dict.version });
                infos.value.push({ "title": "工具链版本", "info": klipper_dict.build_versions });
                infos.value.push({ "title": "主控型号", "info": klipper_dict.config.MCU.toUpperCase() });
                infos.value.push({ "title": "主控频率", "info": (klipper_dict.config.CLOCK_FREQ) / 1000000 + ' MHz' });

                if (klipper_dict.config.hasOwnProperty("RESERVE_PINS_USB")) {
                    infos.value.push({ "title": "USB引脚", "info": `DM:${klipper_dict.config.RESERVE_PINS_USB.split(',')[0]},  DP:${klipper_dict.config.RESERVE_PINS_USB.split(',')[1]}` });
                }
                if (klipper_dict.config.hasOwnProperty("RESERVE_PINS_CAN")) {
                    infos.value.push({ "title": "CAN引脚", "info": `RX:${klipper_dict.config.RESERVE_PINS_CAN.split(',')[0]},  TX:${klipper_dict.config.RESERVE_PINS_CAN.split(',')[1]}` });
                }
                if (klipper_dict.config.hasOwnProperty("CANBUS_FREQUENCY")) {
                    infos.value.push({ "title": "CAN速率", "info": `${klipper_dict.config.CANBUS_FREQUENCY} Kbps` });
                }
                if (klipper_dict.config.hasOwnProperty("RESERVE_PINS_serial")) {
                    infos.value.push({ "title": "UART引脚", "info": `RX:${klipper_dict.config.RESERVE_PINS_serial.split(',')[0]},  TX:${klipper_dict.config.RESERVE_PINS_serial.split(',')[1]}` });
                }
                if (klipper_dict.config.hasOwnProperty("SERIAL_BAUD")) {
                    infos.value.push({ "title": "UART速率", "info": `${klipper_dict.config.SERIAL_BAUD} bps` });
                }

                if (klipper_dict.config.MCU === 'rp2040') {
                    if (!klipper_dict.config.hasOwnProperty("RESERVE_PINS_USB") && !klipper_dict.config.hasOwnProperty("RESERVE_PINS_serial") && !klipper_dict.config.hasOwnProperty("RESERVE_PINS_CAN")) {
                        if (klipper_dict.config.hasOwnProperty("SERIAL_BAUD")) {
                            infos.value.push({ "title": "通信方式", "info": "该固件使用串口UART(RX:gpio1, TX:gpio0)与上位机通信" });
                        } else {
                            infos.value.push({ "title": "通信方式", "info": "该固件使用USB与上位机通信" });
                        }
                    } else if (klipper_dict.config.hasOwnProperty("RESERVE_PINS_CAN")) {
                        if (klipper_dict.config.hasOwnProperty("CANBUS_BRIDGE") && klipper_dict.config.CANBUS_BRIDGE == "1") {
                            infos.value.push({ "title": "通信方式", "info": "该固件使用USB桥接CANBus与上位机通信" });
                        } else {
                            infos.value.push({ "title": "通信方式", "info": "该固件使用CANBus与上位机通信" });
                        }
                    }
                } else {
                    if (klipper_dict.config.hasOwnProperty("RESERVE_PINS_USB") && !klipper_dict.config.hasOwnProperty("RESERVE_PINS_serial") && !klipper_dict.config.hasOwnProperty("RESERVE_PINS_CAN")) {
                        infos.value.push({ "title": "通信方式", "info": "该固件使用USB与上位机通信" });
                    } else if (klipper_dict.config.hasOwnProperty("RESERVE_PINS_serial")) {
                        infos.value.push({ "title": "通信方式", "info": "该固件使用串口UART与上位机通信" });
                    } else if (!klipper_dict.config.hasOwnProperty("RESERVE_PINS_USB") && !klipper_dict.config.hasOwnProperty("RESERVE_PINS_serial") && klipper_dict.config.hasOwnProperty("RESERVE_PINS_CAN")) {
                        infos.value.push({ "title": "通信方式", "info": "该固件使用CANBus与上位机通信" });
                    } else if (klipper_dict.config.hasOwnProperty("RESERVE_PINS_USB") && !klipper_dict.config.hasOwnProperty("RESERVE_PINS_serial") && klipper_dict.config.hasOwnProperty("RESERVE_PINS_CAN")) {
                        if (klipper_dict.config.hasOwnProperty("CANBUS_BRIDGE") && klipper_dict.config.CANBUS_BRIDGE == "1") {
                            infos.value.push({ "title": "通信方式", "info": "该固件使用USB桥接CANBus与上位机通信" });
                        }
                    }
                }

                if (klipper_dict.config.hasOwnProperty("INITIAL_PINS")) {
                    var pins = klipper_dict.config.INITIAL_PINS.split(",");
                    for (i in pins) {
                        var pin = pins[i];
                        // console.log("pin: " + pin);
                        initpins.value.push({ "name": pin.startsWith("!") ? pin.substring(1) : pin, "state": pin.startsWith("!") ? "拉低" : "拉高" });
                    }
                }

                for (let [key, value] of Object.entries(klipper_dict.config)) {
                    if (key.startsWith("BUS_PINS_spi")) {
                        const bus = key.replace("BUS_PINS_", "");
                        const pin_info = value.split(',');
                        spi_infos.value.push({ "bus": bus, "miso": pin_info[0], "mosi": pin_info[1], "sck": pin_info[2] });
                    } else if (key.startsWith("BUS_PINS_i2c")) {
                        const bus = key.replace("BUS_PINS_", "");
                        const pin_info = value.split(',');
                        i2c_infos.value.push({ "bus": bus, "sda": pin_info[0], "scl": pin_info[1] });
                    }
                }

            } catch (error) {
                console.error('解压数据时发生错误:', error);
                mdui.alert({
                    headline: "错误",
                    description: "数据处理失败,0x01",
                    confirmText: "知道了",
                });
            }
        }
        function parseBinFile(file) {
            const fileReader = new FileReader();

            let start_pos = -1;
            let end_pos = -1;


            fileReader.onload = async () => {
                const arrayBuffer = fileReader.result;
                const view = new DataView(arrayBuffer);
                try {
                    const targetSequence = [0x78, 0xDA, 0x9D];
                    let index = 0;

                    // 遍历查找开始位置
                    while (index + targetSequence.length <= arrayBuffer.byteLength) {
                        let foundMatch = true;
                        for (let i = 0; i < targetSequence.length; i++) {
                            if (view.getUint8(index + i) !== targetSequence[i]) {
                                foundMatch = false;
                                break;
                            }
                        }

                        if (foundMatch) {
                            // console.log(`开始位置：${index}`);
                            start_pos = index;
                            break;
                        }
                        index++;
                    }
                    if (start_pos == -1) {
                        let targetSequence12 = [0x78, 0xDA];
                        index = 0;

                        // 遍历查找开始位置
                        while (index + targetSequence12.length <= arrayBuffer.byteLength) {
                            let foundMatch = true;
                            for (let i = 0; i < targetSequence12.length; i++) {
                                if (view.getUint8(index + i) !== targetSequence12[i]) {
                                    foundMatch = false;
                                    break;
                                }
                            }

                            if (foundMatch) {
                                // console.log(`开始位置：${index}`);
                                start_pos = index;
                                break;
                            }
                            index++;
                        }
                    }
                    // 遍历查找结束位置
                    targetSequence2 = [0x02, 0x00, 0x00, 0x00, 0x00, 0x02];
                    while (index + targetSequence2.length <= arrayBuffer.byteLength) {
                        let foundMatch = true;
                        for (let i = 0; i < targetSequence2.length; i++) {
                            if (view.getUint8(index + i) !== targetSequence2[i]) {
                                foundMatch = false;
                                break;
                            }
                        }

                        if (foundMatch) {
                            // console.log(`结束位置：${index}`);
                            end_pos = index;
                            break;
                        }

                        index++;
                    }
                    // console.log('开始位置：', end_pos);
                    if (end_pos == -1) {
                        // console.log('指定的字节序列未在文件中找到。');
                        index = start_pos;
                        targetSequence3 = [0x00, 0x00, 0x00, 0x00, 0x00];
                        while (index + targetSequence3.length <= arrayBuffer.byteLength) {
                            let foundMatch = true;
                            for (let i = 0; i < targetSequence3.length; i++) {
                                if (view.getUint8(index + i) !== targetSequence3[i]) {
                                    foundMatch = false;
                                    break;
                                }
                            }

                            if (foundMatch) {
                                // console.log(`结束位置：${index}`);
                                end_pos = index;
                                break;
                            }

                            index++;
                        }
                    }
                    if (start_pos == -1 || end_pos == -1) {
                        mdui.alert({
                            headline: "错误",
                            description: "Bin文件解析错误,0x02",
                            confirmText: "知道了",
                        });
                        return;
                    }
                    const sliceSize = end_pos - start_pos; // 包括结束位置的4个字节
                    const fileSlice = file.slice(start_pos, start_pos + sliceSize);
                    // console.log(fileSlice);
                    const fileReader2 = new FileReader();
                    fileReader2.onload = async () => {
                        const arrayBuffer = fileReader2.result;
                        const data = new Uint8Array(arrayBuffer);

                        compressedData(data);
                    };

                    fileReader2.readAsArrayBuffer(fileSlice);

                } catch (e) {
                    console.error(e);
                    mdui.alert({
                        headline: "错误",
                        description: "Bin文件解析错误,0x03",
                        confirmText: "知道了",
                    });
                }

            };

            fileReader.readAsArrayBuffer(file);
        }

        function parseUF2File(file) {
            const fileReader = new FileReader();
            fileReader.onload = async () => {
                const arrayBuffer = fileReader.result;
                const datas = new Uint8Array(arrayBuffer);
                var data_hex = bytesToHex(datas);
                let regex = /00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000/g;
                data_hex = data_hex.replace(regex, "");

                // console.log(data_hex);
                let pattern = /306fb10a5546320a57515d9e.*?56ff8be4/g;
                data_hex = data_hex.replace(pattern, '');
                // console.log(data_hex);
                var start_pos = data_hex.indexOf("78da9d");
                if (start_pos == -1) {
                    // console.log('指定的字节序列未在文件中找到。');
                    start_pos = data_hex.indexOf("78da");
                }
                if (start_pos == -1) {
                    mdui.alert({
                        headline: "错误",
                        description: "UF2文件解析错误,0x01",
                        confirmText: "知道了",
                    });
                    return;
                }
                var end_pos = data_hex.indexOf("020000000002", start_pos);
                if (end_pos == -1) {
                    // console.log('指定的字节序列未在文件中找到。');
                    end_pos = data_hex.indexOf("0000000000", start_pos);
                }
                if (end_pos == -1) {
                    mdui.alert({
                        headline: "错误",
                        description: "UF2文件解析错误,0x02",
                        confirmText: "知道了",
                    });
                    return;
                }
                data_hex = data_hex.slice(start_pos, end_pos);
                // console.log(data_hex);
                var data = hexToBytes(data_hex);
                // console.log(data);
                compressedData(data);

            };
            fileReader.readAsArrayBuffer(file);
        }

        function hexToBytes(hexString) {
            const bytes = [];
            for (let i = 0; i < hexString.length; i += 2) {
                bytes.push(parseInt(hexString.slice(i, i + 2), 16));
            }
            return new Uint8Array(bytes);
        }

        function bytesToHex(bytes) {
            return Array.prototype.map.call(bytes, function (byte) {
                return ('0' + (byte & 0xFF).toString(16)).slice(-2);
            }).join('');
        }

        return {
            message,
            infos,
            spi_infos,
            i2c_infos,
            initpins,
            compressedData,
            parseBinFile,
            parseUF2File,
            hexToBytes,
            bytesToHex,
        }
    },
    mounted() {
        let that = this;

        document.addEventListener('DOMContentLoaded', function () {
            const overlay = document.getElementById('overlay');
            const dropZone = document.getElementById('drop-zone');
            const file_btn = document.getElementById('file-input-btn');

            const inputElement = document.getElementById('file-input');
            inputElement.type = 'file';
            inputElement.style.display = 'none';

            // 添加点击事件，打开文件选择对话框
            file_btn.addEventListener('click', function (e) {
                inputElement.click();
            });

            // 监听文件选择事件
            inputElement.addEventListener('change', function () {
                let files = this.files;
                handleFiles(files);
            });

            // 拖拽文件进入时的效果
            dropZone.addEventListener('dragover', function (e) {
                e.preventDefault();
                overlay.classList.add('drag-over');
                // overlay.style.display = 'block'; // 显示遮罩层
            });

            // 拖拽离开时移除效果
            dropZone.addEventListener('dragleave', function (e) {
                e.preventDefault();
                overlay.classList.remove('drag-over');
            });

            // 文件被放下时处理
            dropZone.addEventListener('drop', function (e) {
                e.preventDefault();
                overlay.classList.remove('drag-over');
                let files = e.dataTransfer.files; // 获取拖放的文件列表
                handleFiles(files);
            });

            function handleFiles(files) {
                if (!files.length) {
                    return;
                }
                if (files.length > 1) {
                    mdui.alert({
                        headline: "错误",
                        description: "一次只能处理一个文件",
                        confirmText: "知道了",
                    });
                    return;
                }
                var file = files[0];
                if (!file.name.endsWith('.bin') && !file.name.endsWith('.uf2')) {
                    mdui.alert({
                        headline: "错误",
                        description: "必须是.bin或者.uf2文件",
                        confirmText: "知道了",
                    });
                    return;
                }
                // 文件不能大于2MB
                if (file.size > 2 * 1024 * 1024) {
                    mdui.alert({
                        headline: "错误",
                        description: "文件不能大于2MB",
                        confirmText: "知道了",
                    });
                    return;
                }

                // 开始解析
                if (file.name.endsWith('.bin')) {
                    that.parseBinFile(file);
                } else if (file.name.endsWith('.uf2')) {
                    that.parseUF2File(file);
                    // alert('UF2文件暂不支持');
                }
            }
        });


    }
}).mount('#app')

