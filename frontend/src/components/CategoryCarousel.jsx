import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { setsearchQuery } from '../redux/jobSlice'

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer"
]

function CategoryCarousel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setsearchQuery(query));
    navigate("/browse");
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 my-10">
      <Carousel className="w-full max-w-5xl mx-auto">
        <CarouselContent>
          {
            category.map((cat) => (
              <CarouselItem
                key={cat}
                className="basis-2/3 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center"
              >
                <Button
                  onClick={() => searchJobHandler(cat)}
                  variant="outline"
                  className="rounded-full w-full max-w-[200px] text-sm sm:text-base"
                >
                  {cat}
                </Button>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default CategoryCarousel
