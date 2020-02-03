export function Response(success: boolean, data: any, error_code: number = null, res?: any) {
    return {
        success,
        data,
        res,
        error_code
    };
}
