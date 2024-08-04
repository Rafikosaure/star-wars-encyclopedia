import React from 'react'
import '../styles/index.scss'
import '../styles/Home.scss'
import data from '../data/localApiCategories.json'
import Card from '../components/Card'


export default function Home() {


  const homeText = "bienvenue dans notre encyclopédie galactique dédiée à star wars ! plongez dans un univers où la force guide chaque page et où les légendes prennent vie. que vous soyez un jedi expérimenté ou un padawan curieux, explorez avec nous l’histoire de la saga et découvrez chaque détail de son univers iconique. ce blog est votre portail vers une galaxie riche en aventures, en personnages emblématiques et en mystères à découvrir. que la connaissance soit avec vous, toujours, dans cette aventure interstellaire !"

  return (
    <div className='app'>
      <div className='home-page'>
        <div className='div-welcome'>
          <p className='welcome-message'>
            {homeText.toLowerCase()}
          </p>
        </div>
        <div className='div-categories'>
          <div className='transition1' />
          <div className='transition2' />
          <h2>catégories</h2>
          <div className='card-list'>
            {data.map((item) => 
                <Card key={item._id} item={item} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
