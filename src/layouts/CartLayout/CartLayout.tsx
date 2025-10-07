import CardHeader from '../../components/CardHeader'
import Footer from '../../components/Footer'

interface Props {
  children?: React.ReactNode
}

const CartLayout = ({ children }: Props) => {
  return (
    <div>
      <CardHeader />
      {children}
      <Footer />
    </div>
  )
}
export default CartLayout
