import {Modal} from "antd";

export function showMessageBox(message: string) {
    return new Promise((resolve) => {
        Modal.warning({
            title: '提示！',
            content: message,
            okText:'确定',
            onOk: () => {
                resolve('success')
            }
        })
    })

}
// import { App } from 'antd';
// import type { MessageInstance } from 'antd/es/message/interface';
// import type { ModalStaticFunctions } from 'antd/es/modal/confirm';
// import type { NotificationInstance } from 'antd/es/notification/interface';
//
// let message: MessageInstance;
// let notification: NotificationInstance;
// let modal: Omit<ModalStaticFunctions, 'warn'>;
//
// export default () => {
//     const staticFunction = App.useApp();
//     message = staticFunction.message;
//     modal = staticFunction.modal;
//     notification = staticFunction.notification;
//     return null;
// };
//
// export { message, notification, modal };
