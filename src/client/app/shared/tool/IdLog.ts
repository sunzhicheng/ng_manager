export class IdLog {
    private static LOG_DEBUG = true;
    private static LOG_WARN = true;
    private static LOG_ERROR = true;
    public static log(message?: any, ...optionalParams: any[]) {
        if (this.LOG_DEBUG) {
            if (optionalParams.length > 1) {
                console.log(message, optionalParams);
            } else if (optionalParams.length === 1) {
                console.log(message, optionalParams[0]);
            } else {
                console.log(message);
            }
        }
    }

    public static debug(message?: any, ...optionalParams: any[]) {
        if (this.LOG_DEBUG) {
            if (optionalParams.length > 1) {
                console.log(message, optionalParams);
            } else if (optionalParams.length === 1) {
                console.log(message, optionalParams[0]);
            } else {
                console.log(message);
            }
        }
    }

    public static warn(message?: any, ...optionalParams: any[]) {
        if (this.LOG_WARN) {
            if (optionalParams.length > 1) {
                console.warn(message, optionalParams);
            } else if (optionalParams.length === 1) {
                console.log(message, optionalParams[0]);
            } else {
                console.warn(message);
            }
        }
    }

    /**
     * 错误日志，默认输出
     * @param message 错误提示
     * @param optionalParams 参数
     */
    public static error(message?: any, ...optionalParams: any[]) {
        if (this.LOG_ERROR) {
            if (optionalParams.length > 1) {
                console.error(message, optionalParams);
            } else if (optionalParams.length === 1) {
                console.log(message, optionalParams[0]);
            } else {
                console.error(message);
            }
        }
    }
}
