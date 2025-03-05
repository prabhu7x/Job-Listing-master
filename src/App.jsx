import './App.css'
import JobListing from './features/job-listing'
import desktop_bg from '/images/bg-header-desktop.svg'

function App() {

  return (
    <div className='App'>
        <img src={desktop_bg} className='bg' alt="desktop background image" />
    <JobListing />
    </div>
  )
}

export default App
