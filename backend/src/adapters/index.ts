import {Storage} from '@google-cloud/storage'
import config from '../config/config'
import path from 'path'
import GoogleCloudStorageAdapter from './GoogleCloudStorageAdapter'


const storageAdapter = new GoogleCloudStorageAdapter(
    path.join(__dirname, '..', '..', config.google.storageServiceKey), 
    config.google.projectId,
    config.google.storageBucket
)


export {
    storageAdapter
}