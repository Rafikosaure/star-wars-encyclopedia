import React from 'react'
import '../styles/Collapse.css'
import { useState } from 'react'


export default function Collapse() {

    const [openCollapse, setOpenCollapse] = useState('button-close')
    const [collapseBarAppearence, setCollapseBarAppearence] = useState('collapse-bar-close')
    const [viewText, setViewText] = useState('text-hidden')

    const manageCollapse = () => {
      if (openCollapse === 'button-close') {
        setOpenCollapse('button-open')
        setViewText('text-visible')
        setCollapseBarAppearence('collapse-bar-open')
      } else {
        setOpenCollapse('button-close')
        setViewText('text-hidden')
        setCollapseBarAppearence('collapse-bar-close')
      }
    }



  return (
    <div className='collapse-main'>
        <div className={`collapse-bar ${collapseBarAppearence}`}><h1 className='collapse-title'>CHARTE DU FORUM</h1><div className={`collapse-button ${openCollapse}`} onClick={() => manageCollapse()} /></div>
        <div className={`collapse-div-text ${viewText}`}>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum modi similique voluptates blanditiis alias aut, veniam, nostrum vel perspiciatis delectus neque, placeat suscipit quisquam dolor aliquam eveniet cumque nobis tenetur sit nam temporibus mollitia quo! Dolor consectetur eius eveniet ab impedit ipsum, ducimus, cumque, illo qui officia cupiditate reprehenderit dicta? Possimus, eius accusamus. Voluptate, voluptas eligendi? Nemo quae atque mollitia obcaecati nesciunt ad dolorem, deleniti assumenda dolor nulla omnis quis fuga. Aliquid ipsam voluptates sed exercitationem eaque eum aspernatur iste amet nesciunt iusto, rerum debitis tempora eos error repellendus, consequuntur minus qui excepturi, minima explicabo velit! Distinctio saepe, at nostrum, voluptatum officiis aut laudantium amet deleniti veniam nihil quis vel, modi labore omnis explicabo cupiditate sed excepturi? Nobis recusandae, maxime mollitia eveniet delectus aliquid commodi ab nesciunt doloremque, magnam minus ratione ut voluptatem dolorem in. Iusto quibusdam nostrum nesciunt culpa nobis vel numquam accusamus sapiente reprehenderit perspiciatis. Quasi ipsa, eos reiciendis placeat aut nihil voluptatem porro praesentium incidunt labore laborum hic et non iure sequi doloremque nulla necessitatibus deserunt distinctio aliquid optio repudiandae ab. Temporibus quas ex similique neque eveniet nulla doloremque qui, autem ratione accusantium esse consequatur iusto harum quibusdam voluptas pariatur, quidem minus sapiente natus iure. Modi quae labore enim? Voluptate delectus optio rerum consequuntur rem facere cumque repudiandae libero alias sed corrupti commodi nobis autem consequatur, labore in eius iusto harum nisi! Deleniti, laborum consequatur totam accusantium ab ea porro eligendi asperiores quae fuga animi veniam nihil rerum est in, reprehenderit illo natus atque voluptate. Aliquam obcaecati nostrum adipisci minus excepturi reiciendis, accusantium eveniet rem vel unde eos illum, sunt ex. Aliquam vero sapiente vitae cumque eos voluptas necessitatibus nam consequatur perspiciatis, debitis, sint repellat. Deleniti possimus corrupti earum autem atque fuga distinctio minima maxime ex tempora. Saepe doloremque modi illum dolore porro nisi laborum. Pariatur autem voluptas ipsam molestiae. Accusantium, ut recusandae optio itaque animi fugit praesentium placeat, tempora minima labore eaque. Incidunt, quis labore neque iusto repellendus maxime numquam consectetur voluptatum sit, doloremque tempore, consequuntur impedit laudantium iste veniam eaque! Illo inventore explicabo quidem deleniti eveniet natus necessitatibus ratione perspiciatis repellendus reprehenderit cum soluta est rerum molestiae expedita, cumque harum? Praesentium sunt pariatur at ullam odio autem velit sequi fugiat maiores iusto aperiam dolor inventore nostrum, corporis odit ratione nihil nisi culpa distinctio vitae sint labore nobis nulla! Facere ipsa perspiciatis architecto minima. Laudantium esse ab, provident placeat ullam consectetur assumenda voluptatem hic maxime laboriosam facilis soluta quos quis nam porro reiciendis. Amet ab totam, fugiat aliquid ea ipsa quisquam sapiente, aperiam, explicabo ratione mollitia. Magni eaque saepe voluptatum aliquam. Obcaecati unde deserunt velit culpa molestiae accusamus sequi explicabo maiores ab, fugit neque delectus officia atque architecto porro dolores voluptatibus dicta quasi aut esse aliquid ducimus iusto dolorum molestias. Cumque repellendus aliquid impedit quisquam sint consectetur ab. Minima id, laudantium nemo, ipsam culpa ex dolorem optio non iure, ipsa quasi officiis. Accusantium nobis, natus blanditiis ipsam perspiciatis impedit, architecto ut rerum cum labore obcaecati. Amet qui a voluptate animi quidem repudiandae corrupti fuga placeat rerum.</p>
        </div>
    </div>
  )
}
