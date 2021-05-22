// import { alert, notice, info, success, error } from '@pnotify/core';
import { error, defaults } from '@pnotify/core';
// import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import 'material-design-icons/iconfont/material-icons.css';
defaults.styling = 'material';
defaults.icons = 'material';

const NOTIFICATION_DELAY = 2000;

export default function showError(catchedError) {
  error({
    text: `${catchedError}`,
    mode: 'dark',
    animation: 'fade',
    animateSpeed: 'slow',
    delay: NOTIFICATION_DELAY,
  });
};