import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMapMarkerAlt, faMoon, faSun, faLink, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useTheme } from '@mui/material/styles';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

const Content = ({ darkMode, toggleDarkMode }) => {
  const theme = useTheme();
  const inputRef = useRef()
  const [userName, setUserName] = useState(false);

  const search = async (user) => {
    if (user === "") {
      // alert("Enter Username!");
      return;
    }
    try {
      inputRef.current.value="";
      const url = `https://api.github.com/users/${user}`;

      const response = await fetch(url);
      const data = await response.json();
      const createdAt = data.created_at;
      const formattedDate = formatDate(createdAt);

      if (!response.ok) {
        alert(data.message);
        return;
      }
      // console.log(data);

      setUserName({
        profile: data.html_url,
        photo: data.avatar_url,
        Name: data.name,
        username: data.login,
        // joinedOn: data.created_at,
        joinedOn: formattedDate,
        Bio: data.bio || 'This profile has no bio',
        Repos: data.public_repos,
        Followers: data.followers,
        Following: data.following,
        Location: data.location || 'Not Available',
        twitter: data.twitter_username,
        Blog: data.blog,
        Company: data.company

      })
    }
    catch (error) {
      setUserName(false);
      console.error("Error in fetching user data");
    }
  }

  useEffect(() => {
    search("");
  }, [])


  return (
    <div className='m-2 flex flex-col gap-4 w-fit'>
      <div className='flex justify-between my-4'>
        <h4 className='space-mono-bold' style={{ color: theme.palette.text.primary }}>devfinder</h4>
        <h6
          className='space-mono-regular text-xs'
          style={{ color: theme.palette.text.secondary, cursor: 'pointer' }}
          onClick={toggleDarkMode}
        >
          {darkMode ? 'LIGHT' : 'DARK'} <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        </h6>
      </div>
      <div className="Search h-14 shadow-lg rounded-xl flex justify-between space-mono-regular" style={{ backgroundColor: theme.palette.background.paper }}>
        <div className="mx-6 inputArea flex items-center gap-4">
          <svg class="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <circle cx="11" cy="11" r="8" />  <line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                search(inputRef.current.value);
                // inputRef.current.value="";
              }
            }}
            className='w-96 rounded-lg'
            type="text"
            placeholder="Search GitHub username..."
            style={{ color: theme.palette.text.primary, backgroundColor: theme.palette.background.paper  }}
          />
        </div>
        <button
          className='px-4 py-2 my-1.5 mr-2 rounded-lg'
          style={{
            backgroundColor: theme.palette.action.active,
            color: theme.palette.common.white
          }}
          onClick={() => search(inputRef.current.value)}
        >
          Search
        </button>
      </div>

      {userName ? (
        <div className="Content space-mono-regular p-8 shadow-lg rounded-lg flex gap-8" style={{ backgroundColor: theme.palette.background.paper }}>
          <img className='pic w-28 h-28 rounded-full' src={userName.photo} alt="pic" />
          <div>
            <div className="top flex justify-between">
              <p className='Name space-mono-bold' style={{ color: theme.palette.text.primary }}>{userName.Name}</p>
              <p className='joined space-mono-regular' style={{ color: theme.palette.text.primary }}>Joined {userName.joinedOn}</p>
            </div>
            <p className='username text-sm' style={{ color: theme.palette.primary.main }}> <a href={userName.profile} target='_blank'> @{userName.username} </a></p> <br />
            <p className='bio' style={{ color: theme.palette.text.primary }}>{userName.Bio}</p> <br />
            <div className='rounded-lg px-8 py-4 flex gap-24 w-fit' style={{  backgroundColor: theme.palette.background.default }}>
              <div>
                <p className='repos' style={{ color: theme.palette.text.primary }}>Repos</p>
                <p className='space-mono-bold' style={{ color: theme.palette.text.primary }}>{userName.Repos}</p>
              </div>
              <div>
                <p className='followers' style={{ color: theme.palette.text.primary }}>Followers</p>
                <p className='space-mono-bold' style={{ color: theme.palette.text.primary }}>{userName.Followers}</p>
              </div>
              <div>
                <p className='following' style={{ color: theme.palette.text.primary }}>Following</p>
                <p className='space-mono-bold' style={{ color: theme.palette.text.primary }}>{userName.Following}</p>
              </div>
            </div> <br />
            <div className='last grid grid-cols-2 gap-4 p-2'>
              
              <div>
              {userName.Location ?(
              <p className='location' style={{ color: theme.palette.text.primary }}><FontAwesomeIcon icon={faMapMarkerAlt} /> {userName.Location}</p>
              ):(
                <p style={{ color: theme.palette.text.primary }}><FontAwesomeIcon icon={faMapMarkerAlt} /> Not Available</p>
              )}
              </div>

              <div>
              {userName.twitter ? (
                <p className='twitter' style={{ color: theme.palette.text.primary }}><FontAwesomeIcon icon={faTwitter} /> @{userName.twitter}</p>
              ) : (
                <p style={{ color: theme.palette.text.third }}><FontAwesomeIcon icon={faTwitter} /> Not Available</p>
              )}
              </div>

              <div>
              {userName.blog ? (
                <p className='blog' style={{ color: theme.palette.text.primary }}><FontAwesomeIcon icon={faLink} /> {userName.Blog}</p>
              ) : (
                <p style={{ color: theme.palette.text.third }}><FontAwesomeIcon icon={faLink} /> Not Available</p>
              )}
              </div>

              <div>
              {userName.Company?(
              <p className='company' style={{ color: theme.palette.text.primary }}><FontAwesomeIcon icon={faBuilding} /> {userName.Company}</p>
              ):(
              <p style={{ color: theme.palette.text.third }}><FontAwesomeIcon icon={faBuilding} /> Not Available</p>
              )}
              </div>

            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};







export default Content