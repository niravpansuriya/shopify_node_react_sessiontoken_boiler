import BaseService from "./baseService";

export function verifyApp(url) {
    return BaseService.post(url, {});
}

