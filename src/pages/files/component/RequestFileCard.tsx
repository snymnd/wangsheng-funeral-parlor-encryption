import { useQueryClient } from '@tanstack/react-query';
import { Download, RefreshCcw, Send, Timer } from 'lucide-react';
import * as React from 'react';
import toast from 'react-hot-toast';

import clsxm from '@/lib/clsxm';
import { getFileQuery, useInsertKeyFileMutation } from '@/hooks/query/file';

import IconButton from '@/components/buttons/IconButton';
import Typography from '@/components/typography/Typography';

import { RequestAccess } from '@/types/entities/access';
import { File } from '@/types/entities/file';

type RequestFileCardProps = {
  fileListStatusData: RequestAccess[] | undefined;
  file: File;
} & React.ComponentPropsWithoutRef<'div'>;

export default function RequestFileCard({
  fileListStatusData,
  className,
  file,
  ...rest
}: RequestFileCardProps) {
  const queryClient = useQueryClient();
  const [fileStatus, setFileStatus] = React.useState<number | undefined>();

  React.useEffect(() => {
    const request = fileListStatusData?.find(
      (item) => item.file_id === file.id
    );
    if (request) {
      setFileStatus(request.status);
    }
  }, [fileListStatusData, file]);

  const { mutateAsync: sendRequest } = useInsertKeyFileMutation();

  const handleSendRequest = () => {
    sendRequest({ fileId: file.id, key: '' }).then(() => {
      queryClient.invalidateQueries(['/request/file/list?dir=0']);
    });
  };

  const handleDownload = () => {
    getFileQuery(file.id.toString())
      .then((res) => {
        window.open(res, '_blank');
      })
      .catch(() => {
        toast.error(`failed to get ${file.filename}`, { id: file.filename });
      });
  };
  return (
    <div className={clsxm('', className)} {...rest}>
      <div className='flex items-center justify-between gap-2 rounded-lg bg-base-900 px-3 py-2'>
        <Typography
          variant='b1'
          color='secondary'
          className='truncate'
          title={file.filename}
        >
          {file.filename}
        </Typography>
        {fileStatus !== undefined ? (
          <>
            {fileStatus === 0 && (
              <IconButton
                icon={Timer}
                title='waiting for approval'
                variant='warning'
                disabled
                className='mt-2'
              />
            )}
            {fileStatus === 1 && (
              <IconButton
                title='re-request access'
                icon={RefreshCcw}
                onClick={handleSendRequest}
                className='mt-2'
              />
            )}
            {fileStatus === 2 && (
              <IconButton
                icon={Download}
                title='download'
                variant='success'
                onClick={handleDownload}
                className='mt-2'
              />
            )}
          </>
        ) : (
          <IconButton
            icon={Send}
            title='request access'
            onClick={handleSendRequest}
            className='mt-2'
          />
        )}
      </div>
    </div>
  );
}
