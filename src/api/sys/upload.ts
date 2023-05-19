import { FileType } from 'ant-design-vue/es/upload/interface';
import { UploadImage } from './model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
// import { useGlobSetting } from '/@/hooks/setting';

// const { uploadUrl = '' } = useGlobSetting();

/**
 * @description: Upload interface
 */
export function uploadImageApi(file: FileType) {
  const data = new FormData();
  data.append('ds', file);
  return defHttp.post<UploadImage>({
    url: '/static/image/upload',
    data,
  });
}
