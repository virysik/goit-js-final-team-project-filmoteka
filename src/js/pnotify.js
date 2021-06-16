import * as PNotify from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
const errorNotification = () => {
    PNotify.error({
            text: "Search result not successful. Enter the correct movie name and try again.",
            hide: true,
            delay: 2000
        })  
}

export default errorNotification