import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from 'react-redux';

const Slider = (props) => {

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    }

    const doctors = useSelector((state) => state.doctors)

    const d = doctors.filter(i => i.status === props.type)

    return (
        <div>
            <Carousel responsive={responsive} key={d}>
                {d.map((item) => (
                    <div className='bg-amber-500 w-4/5 h-36 mt-2 ml-2 rounded-xl p-2 text-center cursor-pointer'>
                        <p>{item.fullName}</p>
                        <p>{item.speciality}</p>
                        <p>{item.phoneNumber}</p>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default Slider
