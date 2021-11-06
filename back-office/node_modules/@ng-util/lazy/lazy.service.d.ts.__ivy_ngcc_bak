import { Observable } from 'rxjs';
export declare type NuLazyResourcesType = 'script' | 'style';
export interface NuLazyResources {
    path: string;
    type: NuLazyResourcesType;
    /**
     * 回调名称
     */
    callback?: string;
}
export interface NuLazyResult {
    path: string;
    status: 'ok' | 'error' | 'loading';
    type?: NuLazyResourcesType;
    error?: {};
}
export declare class NuLazyService {
    private doc;
    private list;
    private cached;
    private _notify;
    constructor(doc: any);
    private fixPaths;
    /**
     * Monitor for the finished of `paths`
     *
     * - It's recommended to pass the value in accordance with the `load()` method
     */
    monitor(paths?: string | Array<string | NuLazyResources>): Observable<NuLazyResult[]>;
    clear(): void;
    /**
     * Load the specified resources, includes `.js`, `.css`
     *
     * - The returned Promise does not mean that it was successfully loaded
     * - You can monitor load is success via `monitor()`
     */
    load(paths: string | Array<string | NuLazyResources>): Promise<NuLazyResult[]>;
    loadScript(path: string, options?: {
        innerContent?: string;
        callback?: string;
    }): Promise<NuLazyResult>;
    loadStyle(path: string, options?: {
        rel?: string;
        innerContent?: string;
    }): Promise<NuLazyResult>;
}
