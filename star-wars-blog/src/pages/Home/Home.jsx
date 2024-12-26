import React from 'react'
import '../../sharedStyles/index.scss'
import './Home.scss'
import data from '../../data/localApiCategories.json'
import Card from '../../components/Card/Card'


export default function Home() {


  const homeText = "Bienvenue dans notre encyclopédie galactique dédiée à Star Wars ! Plongez dans un univers où la Force guide chaque page et où les légendes prennent vie. Que vous soyez un jedi expérimenté ou un padawan curieux, explorez avec nous l’histoire de la saga et découvrez chaque détail de son univers iconique. Que la connaissance soit avec vous dans cette aventure interstellaire !"

  return (
    <div className='app home-page'>
      <div className='div-welcome'>
        <p className='welcome-message'>
          {homeText}
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
  )
}
