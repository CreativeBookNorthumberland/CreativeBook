import '../../css/Loader.css'

function Loader(props) {

  return (
    <div className='loader'>
        <div className='dot' style={{'backgroundColor': props.color ?? 'black'}} />
        <div className='dot' style={{'backgroundColor': props.color ?? 'black'}} />
        <div className='dot' style={{'backgroundColor': props.color ?? 'black'}} />
    </div>
  )

}

export default Loader;
