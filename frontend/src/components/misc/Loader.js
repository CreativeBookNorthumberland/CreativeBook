import '../../css/Loader.css'

function Loader(props) {

  return (
    <div className='loader'>
        <div className='dot' style={{'backgroundColor': props.color ?? 'rgb(var(--secondary-color))'}} />
        <div className='dot' style={{'backgroundColor': props.color ?? 'rgb(var(--secondary-color))'}} />
        <div className='dot' style={{'backgroundColor': props.color ?? 'rgb(var(--secondary-color))'}} />
    </div>
  )

}

export default Loader;
