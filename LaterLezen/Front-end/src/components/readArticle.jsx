
import userEvent from '@testing-library/user-event';
import React, { useState, useEffect } from 'react';
import Preferences from './Preferences';

export default function ReadArticle(props) {

  const [fontSize, setFontSize] = useState('medium');
  const [background, setBackground] = useState('white');

  const checkFont = (value) => {
    setFontSize(value)
    console.log(value)
  }

  const checkBackground = (background) => {
    setBackground(background)
    console.log(background)
  }

  useEffect(() => {
    document.body.className = 'bg-' + background;
    
    return () => document.body.className = ''
  })

  return (
    <>
      <Preferences handleBackgroundState={checkBackground}
      backgroundColor={background}
       handleFontState={checkFont}
       ></Preferences>

      <div className={'text-' + fontSize}>

        <h1>Dit is een test</h1>

        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
          ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec,
          pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec
          pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,
          rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
          mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper
          nisi.
</p>
        <h2>oke dan</h2>
        <p>
          Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu,
          consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra
          quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.
          Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur
          ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus,
          tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing
          sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit
          id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut
</p>
        <h3>Test h333333</h3>
        <p>ue rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur
        ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus,
        tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing
        sem neque sed ipsum. Nam quam </p>
        <h4>Test h44444</h4>
        <p>quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.
        Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur
        ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus,
        tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing
        sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit
        id, lorem. Maecenas nec odio et ante tincidunt temp</p>
        <h5>Test h555</h5>
        <p>quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.
        Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur
        ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus,
        tellus <a href="#">eget condimentum rhoncus</a>, sem quam semper libero, sit amet adipiscing
        sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit
        id, lorem. Maecenas nec odio et ante tincidunt temp</p>
        <h6>Test h6666</h6>
        <p>quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.
        Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur
        ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus,
        tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing
        sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit
        id, lorem. Maecenas nec odio et ante tincidunt temp</p>

      </div>
    </>)
}


