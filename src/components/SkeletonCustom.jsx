import React from 'react'

export default function SkeletonCustom() {
  return (
    <div className="rounded-md p-4 max-w-sm w-full mx-auto bg-white mb-2 min-h-[108px] sm:max-w-4xl">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-neutral-400 rounded col-span-1"></div>
              <div className="h-2 bg-white rounded col-span-1"></div>
              <div className="h-2 bg-neutral-400 rounded col-span-1"></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-neutral-400 rounded col-span-1"></div>
              <div className="h-2 bg-neutral-400 rounded col-span-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
