'use client'

import { Progress } from '@/components/ui/progress'
import { useToast } from '@/components/ui/use-toast'
import { useUploadThing } from '@/lib/uploadthing'
import { cn } from '@/lib/utils'
import { Image, Loader2, MousePointerSquareDashed } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import Dropzone, { FileRejection } from 'react-dropzone'

const Page = () => {
  const { toast } = useToast()
  const [isDragOver, setIsDragOver] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const router = useRouter()

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configId
      startTransition(() => {
        router.push(`/configure/design?id=${configId}`)
      })
    },
    onUploadProgress(p) {
      setUploadProgress(p)
    },
  })

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles
    setIsDragOver(false)
    toast({
      title: `${file.file.type} type n'est pas supporté.`,
      description: "Veuillez choisir une image PNG, JPG ou JPEG.",
      variant: "destructive"
    })
  }

  const onDropAccepted = (acceptedFiles: File[]) => {
    startUpload(acceptedFiles, { configId: undefined })
    setIsDragOver(false)
  }

  const [isPending, startTransition] = useTransition()

  return (
    <div
      className={cn(
        'relative h-full flex-1 my-16 w-full rounded-xl bg-gray-900/5 p-8 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center',
        {
          'ring-green-600/25 bg-green-600/10': isDragOver,
        }
      )}>
      <div className='relative flex flex-1 flex-col items-center justify-center w-full'>
        <Dropzone
          onDropRejected={onDropRejected}
          onDropAccepted={onDropAccepted}
          accept={{
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg'],
            'image/jpg': ['.jpg'],
          }}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}>
          {({ getRootProps, getInputProps }) => (
            <div
              className='h-full w-full flex-1 flex flex-col items-center justify-center'
              {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragOver ? (
                <MousePointerSquareDashed className='h-8 w-8 text-green-600 mb-4' />
              ) : isUploading || isPending ? (
                <Loader2 className='animate-spin h-8 w-8 text-green-600 mb-4' />
              ) : (
                <Image className='h-8 w-8 text-green-600 mb-4' />
              )}
              <div className='flex flex-col justify-center mb-4 text-base text-gray-700 dark:text-gray-300'>
                {isUploading ? (
                  <div className='flex flex-col items-center'>
                    <p className="font-medium">Téléchargement en cours...</p>
                    <Progress
                      value={uploadProgress}
                      className='mt-4 w-48 h-2 bg-gray-200 dark:bg-gray-700'
                    />
                  </div>
                ) : isPending ? (
                  <div className='flex flex-col items-center'>
                    <p className="font-medium">Redirection en cours...</p>
                  </div>
                ) : isDragOver ? (
                  <p>
                    <span className='font-semibold text-green-600'>Déposez votre fichier</span> pour commencer
                  </p>
                ) : (
                  <p>
                    <span className='font-semibold text-green-600'>Cliquez pour télécharger</span> ou
                    glissez-déposez
                  </p>
                )}
              </div>

              {isPending ? null : (
                <p className='text-sm text-gray-500 dark:text-gray-400'>Formats acceptés : PNG, JPG, JPEG</p>
              )}
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  )
}

export default Page
