import { ArrowsExpandIcon } from '@heroicons/react/outline';
import Paper from 'paper';
import React, { createRef, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import sketches from './sketches';
import { randomNumber } from './sketches/utils';

const useQuery = () => {
  const { search } = useLocation()

  return useMemo(() => new URLSearchParams(search), [search]);
}

interface CanvasProps {
  id: string
  className?: string
  sketch: (canvas: HTMLCanvasElement | null, callback?: () => void) => void
  callback?: () => void
}

const Canvas = ({ id, className, sketch, callback }: CanvasProps) => {
  const canvasRef = createRef<HTMLCanvasElement>()

  useEffect(() => {
    Paper.setup(canvasRef.current as any)
    sketch(canvasRef.current, callback)
  }, [canvasRef, sketch])

  return (
    <canvas ref={canvasRef} id={id} className={className} />
  )
}

export const Gallery = () => {
  return (
    <>
      <div className='flex justify-center py-6 w-full h-full'>
        <div className='w-3/4 h-3/4'>
          <div className='flex flex-wrap h-1/2 justify-center'>
            {sketches.map(e => (
              <Link to={`/${e.name}`} className='flex flex-col items-center lg:w-1/3 sm:w-1/2 p-4'>
                <div className='text-xl pb-2'>{e.name}</div>
                <img
                  alt={e.name}
                  src={`assets/${e.name}/${e.name}_${randomNumber(10)}.png`}
                  className='bg-white w-full aspect-portrait border-4 border-black p-4'
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export const Showcase = () => {
  const params = useParams()
  const query = useQuery()

  const isFullScreen = !!query.get('fullScreen')
  const sketch = sketches.find(s => s.name === params.sketch)

  if (sketch) {
    if (isFullScreen) {
      return (
        <div className='absolute top-0 left-0 w-full h-screen'>
          <Canvas
            id={sketch.name}
            className='bg-white w-full h-screen'
            sketch={sketch.drawCanvas}
          />
        </div>
      )
    } else {
      return (
        <div className='flex justify-center w-full h-full'>
          <div className='md:w-3/4 sm:w-5/6 h-full'>
            <div className='flex flex-col items-center p-4 h-full'>
              <div className='flex justify-between items-center pb-2'>
                <div className='text-xl'>
                  {sketch.name}
                </div>
                <Link to={`/${sketch.name}?fullScreen=true`}>
                  <ArrowsExpandIcon className='w-4 ml-4' />
                </Link>
              </div>
              <Canvas
                id={sketch.name}
                className='bg-white w-full h-full border-4 border-black p-4'
                sketch={sketch.drawCanvas}
              />
            </div>
          </div>
        </div>
      )
    }
  } else {
    return (<></>)
  }
}

export default Gallery;

