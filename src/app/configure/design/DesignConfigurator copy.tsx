'use client'

import HandleComponent from '@/components/HandleComponent'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn, formatPrice } from '@/lib/utils'
import NextImage from 'next/image'
import { Rnd } from 'react-rnd'
import { RadioGroup } from '@headlessui/react'
import { useRef, useState } from 'react'
import {
  COLORS,
  FINISHES,
  MATERIALS,
  MODELS,
} from '@/validators/option-validator'
import { Label } from '@/components/ui/label'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check, ChevronsUpDown } from 'lucide-react'
import { BASE_PRICE } from '@/config/products'
import { useUploadThing } from '@/lib/uploadthing'
import { useToast } from '@/components/ui/use-toast'
import { useMutation } from '@tanstack/react-query'
import { saveConfig as _saveConfig, SaveConfigArgs } from './actions'
import { useRouter } from 'next/navigation'

interface DesignConfiguratorProps {
  configId: string
  imageUrl: string
  imageDimensions: { width: number; height: number }
}

const DesignConfigurator = ({
  configId,
  imageUrl,
  imageDimensions,
}: DesignConfiguratorProps) => {
  const { toast } = useToast()
  const router = useRouter()

  const { mutate: saveConfig, isPending } = useMutation({
    mutationKey: ['save-config'],
    mutationFn: async (args: SaveConfigArgs) => {
      await Promise.all([saveConfiguration(), _saveConfig(args)])
    },
    onError: () => {
      toast({
        title: 'Something went wrong',
        description: 'There was an error on our end. Please try again.',
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      router.push(`/configure/preview?id=${configId}`)
    },
  })

  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number]
    model: (typeof MODELS.options)[number]
    material: (typeof MATERIALS.options)[number]
    finish: (typeof FINISHES.options)[number]
  }>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  })

  const [renderedDimension, setRenderedDimension] = useState({
    width: imageDimensions.width / 4,
    height: imageDimensions.height / 4,
  })

  const [renderedPosition, setRenderedPosition] = useState({
    x: 150,
    y: 205,
  })

  const phoneCaseRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { startUpload } = useUploadThing('imageUploader')

  async function saveConfiguration() {
    try {
      const {
        left: caseLeft,
        top: caseTop,
        width,
        height,
      } = phoneCaseRef.current!.getBoundingClientRect()

      const { left: containerLeft, top: containerTop } =
        containerRef.current!.getBoundingClientRect()

      const leftOffset = caseLeft - containerLeft
      const topOffset = caseTop - containerTop

      const actualX = renderedPosition.x - leftOffset
      const actualY = renderedPosition.y - topOffset

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')

      const userImage = new Image()
      userImage.crossOrigin = 'anonymous'
      userImage.src = imageUrl
      await new Promise((resolve) => (userImage.onload = resolve))

      ctx?.drawImage(
        userImage,
        actualX,
        actualY,
        renderedDimension.width,
        renderedDimension.height
      )

      const base64 = canvas.toDataURL()
      const base64Data = base64.split(',')[1]

      const blob = base64ToBlob(base64Data, 'image/png')
      const file = new File([blob], 'filename.png', { type: 'image/png' })

      await startUpload([file], { configId })
    } catch (err) {
      toast({
        title: 'Something went wrong',
        description:
          'There was a problem saving your config, please try again.',
        variant: 'destructive',
      })
    }
  }

  function base64ToBlob(base64: string, mimeType: string) {
    const byteCharacters = atob(base64)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    return new Blob([byteArray], { type: mimeType })
  }

  return (
    <div className='relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20'>
      <div
        ref={containerRef}
        className='relative h-[calc(100vh-200px)] md:h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl mx-auto 
          flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 
          p-4 md:p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'>
        <div className='relative w-full h-full overflow-auto md:overflow-visible touch-pan-y'>
          <div className='absolute inset-0 flex items-center justify-center min-h-[600px] md:min-h-0'>
            <div className='relative w-36 md:w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]'>
              <AspectRatio
                ref={phoneCaseRef}
                ratio={896 / 1831}
                className='pointer-events-none relative z-50 aspect-[896/1831] w-full'>
                <NextImage
                  fill
                  alt='phone template'
                  src='/phone-template.png'
                  className='pointer-events-none z-50 select-none'
                />
              </AspectRatio>
              <div className='absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] 
                shadow-[0_0_0_99999px_rgba(229,231,235,0.6)] dark:shadow-[0_0_0_99999px_rgba(17,24,39,0.6)]' />
              <div
                className={cn(
                  'absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]',
                  `bg-${options.color.tw}`
                )}
              />
            </div>

            <Rnd
              default={{
                x: 150,
                y: 205,
                height: imageDimensions.height / 4,
                width: imageDimensions.width / 4,
              }}
              onResizeStop={(_, __, ref, ___, { x, y }) => {
                setRenderedDimension({
                  height: parseInt(ref.style.height.slice(0, -2)),
                  width: parseInt(ref.style.width.slice(0, -2)),
                })
                setRenderedPosition({ x, y })
              }}
              onDragStop={(_, data) => {
                const { x, y } = data
                setRenderedPosition({ x, y })
              }}
              className='absolute z-20 border-[3px] border-primary'
              lockAspectRatio
              bounds="parent"
              resizeHandleComponent={{
                bottomRight: <HandleComponent />,
                bottomLeft: <HandleComponent />,
                topRight: <HandleComponent />,
                topLeft: <HandleComponent />,
              }}>
              <div className='relative w-full h-full'>
                <NextImage
                  src={imageUrl}
                  fill
                  alt='your image'
                  className='pointer-events-none'
                />
              </div>
            </Rnd>
          </div>
        </div>
      </div>

      <div className='h-auto lg:h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col 
        bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800'>
        <ScrollArea className='flex-1 overflow-auto px-6 py-6'>
          <div className='space-y-8'>
            <div>
              <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-6'>
                Personnalisez votre coque
              </h2>

              <RadioGroup
                value={options.color}
                onChange={(val) => setOptions((prev) => ({ ...prev, color: val }))}>
                <Label className="mb-3">Couleur: {options.color.label}</Label>
                <div className='flex flex-wrap gap-3'>
                  {COLORS.map((color) => (
                    <RadioGroup.Option
                      key={color.label}
                      value={color}
                      className={({ active, checked }) =>
                        cn(
                          'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none',
                          active || checked ? `ring-2 ring-${color.tw} ring-offset-2` : ''
                        )
                      }>
                      <span
                        className={cn(
                          `bg-${color.tw}`,
                          'h-8 w-8 rounded-full border border-black/10'
                        )}
                      />
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>

              <div className='mt-8'>
                <Label className="mb-3">Modèle</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='outline'
                      role='combobox'
                      className='w-full justify-between'>
                      {options.model.label}
                      <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-full'>
                    {MODELS.options.map((model) => (
                      <DropdownMenuItem
                        key={model.label}
                        className={cn(
                          'flex items-center gap-2 p-2',
                          model.label === options.model.label ? 'bg-gray-100 dark:bg-gray-800' : ''
                        )}
                        onClick={() => setOptions((prev) => ({ ...prev, model }))}>
                        <Check
                          className={cn(
                            'h-4 w-4',
                            model.label === options.model.label ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                        {model.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {[MATERIALS, FINISHES].map(({ name, options: selectableOptions }) => (
                <div key={name} className='mt-8'>
                  <RadioGroup
                    value={options[name]}
                    onChange={(val) => setOptions((prev) => ({ ...prev, [name]: val }))}>
                    <Label className="mb-3">
                      {name === 'material' ? 'Matériau' : 'Finition'}
                    </Label>
                    <div className='space-y-3'>
                      {selectableOptions.map((option) => (
                        <RadioGroup.Option
                          key={option.value}
                          value={option}
                          className={({ active, checked }) =>
                            cn(
                              'relative block cursor-pointer rounded-lg px-6 py-4 shadow-sm border-2 focus:outline-none',
                              checked 
                                ? 'bg-green-50 border-green-600 dark:bg-green-900/20 dark:border-green-500' 
                                : 'border-gray-200 dark:border-gray-700',
                              active && 'ring-2 ring-green-600 ring-offset-2 dark:ring-offset-gray-900'
                            )
                          }>
                          <div className='flex items-center justify-between'>
                            <div className='flex flex-col'>
                              <RadioGroup.Label className='font-medium text-gray-900 dark:text-white'>
                                {option.label}
                              </RadioGroup.Label>
                              {option.description && (
                                <RadioGroup.Description className='text-sm text-gray-500 dark:text-gray-400'>
                                  {option.description}
                                </RadioGroup.Description>
                              )}
                            </div>
                            <div className='text-sm font-medium text-gray-900 dark:text-white'>
                              {formatPrice(option.price / 100)}
                            </div>
                          </div>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>

        <div className='p-6 border-t border-gray-200 dark:border-gray-800'>
          <div className='flex items-center justify-between mb-4'>
            <span className='text-sm text-gray-600 dark:text-gray-400'>Total</span>
            <span className='text-lg font-semibold text-gray-900 dark:text-white'>
              {formatPrice((BASE_PRICE + options.finish.price + options.material.price) / 100)}
            </span>
          </div>
          <Button
            onClick={() =>
              saveConfig({
                configId,
                color: options.color.value,
                finish: options.finish.value,
                material: options.material.value,
                model: options.model.value,
              })
            }
            disabled={isPending}
            className='w-full py-6 text-base font-semibold'>
            {isPending ? 'Sauvegarde...' : 'Continuer'}
            <ArrowRight className='ml-2 h-5 w-5' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DesignConfigurator
