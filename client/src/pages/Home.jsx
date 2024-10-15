import { useQuery } from '@tanstack/react-query';
import { CiSearch } from "react-icons/ci";
import Loader from '../components/Loader';
import Error from '../components/Error';
import api from '../utils/api';
import Card from '../components/Card';
import { useState } from 'react';
import { useDebounce } from "@uidotdev/usehooks";


const Home = () => {
  // ARAMA terimi
  const [searchTerm, setSearchTerm] = useState("");

  // sıralama
  const [order, setOrder] = useState(null);

  // kullanıcının girdiği değişikliği belli aralıklarla görmezden gelir,
  // ancak 300ms boyunca başka tuşa basılmazsa algılar
  const debouncedTerm = useDebounce(searchTerm, 300);

  // Apiye gönderilecek PARAMETRELER
  const params = {
    search: debouncedTerm,
    order,
  };

  // APİ isteği
  const {isLoading, isError, data} = useQuery({
    queryKey: ["recipes", debouncedTerm, order],
    queryFn: ()=> api.get("/api/recipes", {params}).then((res)=> res.data),
  });



  return (
    <main className='flex-1 p-4 bg-gray-200 overflow-auto'>
      <section>
        <div className='flex p-2 gap-3 rounded-lg overflow-hidden items-center shadow-lg bg-white'>
          <CiSearch className='text-xl'/>
          <input onChange={(e)=> setSearchTerm(e.target.value)} className='w-full outline-none' type="text" />
        </div>
      </section>

      <section>
        {isLoading ? (<Loader/>) : isError ? (<Error/>)
        : (
        <>
        <div className='flex justify-between items-center' >
          <h1 className='text-3xl my-5'> {data.results} tarif bulundu </h1>

          <select onChange={(e)=> setOrder(e.target.value)} className='rounded-md p-2'>
            <option selected disabled>süreye göre</option>
            <option value="asc">artan</option>
            <option value="desc">azalan</option>
          </select>
        </div>

{/* TODO KARTLARI oluştur */}
        <div className='grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
          {data.recipes.map((recipe)=> (
            <Card recipe={recipe} key={recipe.id} />
          ))}
        </div>
        </>
      )}
      </section>
    </main>
  )
}

export default Home