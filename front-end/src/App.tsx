import './App.css'
import AppRouter from './routes/Routes';
import Header from './layouts/Header'
import Footer from './layouts/Footer'
import Navigate from './layouts/Navigate';
function App() {

  return (
    <div className='flex h-screen fixed w-full'>
      <div className='w-[20%] hidden lg:block'>
        <Navigate />
      </div>
      <button className='lg:hidden fixed'>Menu</button>
      <div className='flex-col w-full lg:full overflow-y-scroll'>
        <Header />
        <AppRouter />
        <Footer />
      </div>
  </div>  
  )
}

export default App
