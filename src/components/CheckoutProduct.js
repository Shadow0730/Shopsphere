import Image from "next/image";
import { useDispatch } from "react-redux";
import { removeFromBasket } from "../slices/basketSlice";

function CheckoutProduct({
    id,
    title,
    price,
    description,
    category,
    image,
  }){
    const dispatch = useDispatch();

    const removeItemFromBasket = () => {
      dispatch(removeFromBasket({ id }))
    };

    return(
        <div className="grid grid-cols-5">
          <Image src={image} height={200} width={200} objectfit="contain" />
{/*mid*/}
          <div className="col-spce-3 mx-5">
            <p>{title}</p>
            
            <p className="text-xs my-2 line-clamp-3">{description}</p>
          </div>

          <div className="flex flex-col space-y-2 my-auto justify-self-end">
            <button className="button">Add to Basket</button>
            <button onClick={removeItemFromBasket} className="button">Remove From Basket</button>
          </div> 
        </div>
    )
}

export default CheckoutProduct;