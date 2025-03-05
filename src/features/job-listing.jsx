import { useCallback, useState } from 'react';
import data from '../data.json'
import iconRemove from '/images/icon-remove.svg'
import * as motion from "motion/react-client"
import { AnimatePresence } from 'framer-motion';

function JobListing () {

    const [filters, setFilters] = useState({
      langs: [],
      role: '',
      level: ''
    })

    const listJobs = data.filter((job) =>
    (filters.langs.length === 0 || filters.langs.some((lang)=>job.languages.includes(lang))) && 
    (filters.level === '' || job.level === filters.level) 
    && (filters.role === "" || job.role === filters.role)
    );   

    const addRemoveLang = useCallback((language) => {
      setFilters((prev) => ({
        ...prev,
        langs: prev.langs.includes(language) ? prev.langs.filter((item) => item !== language) : [...prev.langs, language]
      }))
    }, [])
   
   const removeLanguage = useCallback((language) => {
    setFilters((prev) => ({
      ...prev,
      langs: prev.langs.filter((item) => item !== language)
    }))
   } ,[] )

   const clearFilters = useCallback(() => {
     setFilters({
       langs: [],
       role: '',
       level: ''
     })})
    ////// main /////
    return (
      <main>
        <AnimatePresence initial={false}>
       { filters.role || filters.level || filters.langs.length >= 1 ? 
       <motion.div
       initial={{ opacity: 0, scale: 0, y: '-50%' }}
       animate={{ opacity: 1, scale: 1, y: '-50%' }}
       exit={{ opacity: 0, scale: 0, y: '-50%' }}
        className='keywordsContainer'> <div className="keywords">
          {filters.langs.map((item,i) => (
            <button key={i} onClick={()=>removeLanguage(item)}>
              <span>{item}</span>
              <img src={iconRemove} alt="remove" />
            </button>
          ))}
          {filters.role ? (
            <button onClick={()=>setFilters((prev) => ({...prev, role: ''}))}>
              <span>{filters.role}</span>
              <img src={iconRemove} alt="remove" />
            </button>
          ) : null}
          {filters.level ? (
            <button onClick={()=>setFilters(prev => ({...prev, level: ''}))}>
              <span>{filters.level}</span>
              <img src={iconRemove} alt="remove" />
            </button>
          ) : null} </div> <button onClick={clearFilters} className='clear'>Clear</button>
        </motion.div> : null
        }
        </AnimatePresence>
        {listJobs.map((job) => (
          <article key={job.id}
          className={job.new || job.featured ? 'new-or-featured' : null}
          >
            <img src={job.logo} alt="logo" />
            <div>
              <h1>{job.company}
                {job.new ? <span className="new">NEW!</span> : null}
                {job.featured ? <span className="featured">FEATURED</span> : null}
                 </h1>
              <p>{job.position}</p>
              <ul className="time">
                <li>{job.postedAt}</li>
                <li>{job.contract}</li>
                <li>{job.location}</li>
              </ul>
            </div>
            <ul className="lang">
              <li onClick={() => setFilters((prev) => ({...prev, role: job.role}))}>{job.role}</li>
              <li onClick={() => setFilters(prev => ({...prev, level: job.level}))}>{job.level}</li>
              {job.languages.map((language, i) => (
                <li key={i} onClick={() => addRemoveLang(language)}>
                  {language}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </main>
    );
}

export default JobListing;