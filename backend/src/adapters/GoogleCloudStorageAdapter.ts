import { File, IStorageAdapter } from "../use-cases";
import { Storage, Bucket, UploadResponse } from '@google-cloud/storage'
import config from '../config/config'
import path from "path";


export default class GoogleCloudStorageAdapter implements IStorageAdapter {
    
    private targetBucket: Bucket

    constructor(serviceKeyPath: string, projectId:string, bucketName:string) {

        const gc = new Storage({
            keyFilename: serviceKeyPath,
            projectId: projectId
        })
        this.targetBucket = gc.bucket(bucketName)

    }

    async remove(f: File): Promise<void> {
        this.targetBucket.file(f.filename).delete()
    }

    async removeFileArray(f: File[]): Promise<void> {
        f.map(val => this.remove(val))
    }
    
    async upload(f: File): Promise<string | null> {
        try {
            const res:UploadResponse = await this.targetBucket.upload(f.path)
            return res[0]? `https://storage.googleapis.com/${this.targetBucket.name}/${f.filename}` : null     
        } catch(err) {
            console.error(err)
        }
        return null
    }
    
    
    async uploadFileArray(fs: File[]): Promise<string[] | null> {

        try {
            const result = await Promise.all(fs.map(val => this.upload(val)))
            return result.filter(val => val != null) as string[]
        }
        catch(err) {
            console.error(err)
        }
        return null
        
    }
}