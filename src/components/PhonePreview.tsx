'use client'

import { CaseColor } from '@prisma/client'
import { cn } from '@/lib/utils'
import Phone from './Phone'

interface PhonePreviewProps {
  croppedImageUrl: string
  color: CaseColor
  className?: string
}

const PhonePreview = ({ croppedImageUrl, color, className }: PhonePreviewProps) => {
  let caseBackgroundColor = 'bg-zinc-950'
  if (color === 'blue') caseBackgroundColor = 'bg-blue-950'
  if (color === 'rose') caseBackgroundColor = 'bg-rose-950'

  return (
    <Phone
      className={cn(caseBackgroundColor, className)}
      imgSrc={croppedImageUrl}
      dark={false}
    />
  )
}

export default PhonePreview
