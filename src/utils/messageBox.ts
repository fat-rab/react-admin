import {Modal} from "antd";

export function showMessageBox(message: string) {
    return new Promise((resolve) => {
        Modal.warning({
            title: '提示！',
            content: message,
            onOk: () => {
                resolve('success')
            }
        })
    })

}
