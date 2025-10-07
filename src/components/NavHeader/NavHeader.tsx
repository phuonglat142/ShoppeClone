import { ChevronDown, Globe } from 'lucide-react'
import Popover from '../Popover'
import { useContext } from 'react'
import { AppContext } from '../../contexts/app.context'
import { Link } from 'react-router-dom'
import path from '../../constants/path'
import reactSvg from '~/assets/react.png'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import authApi from '../../apis/auth.api'
import { purchasesStatus } from '../../constants/purchase'

const NavHeader = () => {
  const { setIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
  const queryClient = useQueryClient()

  const logoutMutaion = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
    }
  })

  const handleLogout = () => {
    logoutMutaion.mutate()
  }

  return (
    <div className='flex justify-end'>
      <Popover
        className='flex items-center py-1 hover:text-white/70 cursor-pointer'
        renderPopover={
          <div className='bg-white relative shadow-sm rounded-sm border border-gray-200'>
            <div className='flex flex-col py-2 pr-28 pl-3'>
              <button className='py-2 px-3 hover:text-orange text-left'>Tiếng Việt</button>
              <button className='py-2 px-3 hover:text-orange mt-2 text-left'>English</button>
            </div>
          </div>
        }
      >
        <Globe />
        <span className='mx-1'>Tiếng Việt</span>
        <ChevronDown />
      </Popover>
      {isAuthenticated && (
        <Popover
          className='flex items-center py-1 hover:text-white/70 cursor-pointer ml-6'
          renderPopover={
            <div className='bg-white relative shadow-sm rounded-sm border border-gray-200'>
              <Link
                to={path.profile}
                className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
              >
                Tài khoản của tôi
              </Link>
              <Link to='/' className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'>
                Đơn mua
              </Link>
              <button
                onClick={handleLogout}
                className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
              >
                Đăng xuất
              </button>
            </div>
          }
        >
          <div className='w-6 h-6 mr-2 flex-shrink-0'>
            <img src={reactSvg} alt='avatar' className='w-full h-full object-cover rounded-full' />
          </div>
          <div>{profile?.email}</div>
        </Popover>
      )}

      {!isAuthenticated && (
        <div className='flex items-center'>
          <Link to={path.register} className='mx-3 capitalize hover:text-white/70'>
            Đăng ký
          </Link>
          <div className='border-r-[1px] border-r-white/40 h-4' />
          <Link to={path.login} className='mx-3 capitalize hover:text-white/70'>
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  )
}

export default NavHeader
