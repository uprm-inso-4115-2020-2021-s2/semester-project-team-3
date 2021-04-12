import { File, IStorageAdapter } from "../../declarations";

export class MockStorageAdapter implements IStorageAdapter {
    remove(f: File): Promise<void> {
        return Promise.resolve()
    }
    removeFileArray(f: File[]): Promise<void> {
        return Promise.resolve()
    }
    async upload(f: File): Promise<string | null> {
        return "Example Url"
    }
    async uploadFileArray(fs: File[]): Promise<string[] | null> {
        return fs.map(val => "example url")
    }
}