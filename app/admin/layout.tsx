'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  FileText, 
  Image as ImageIcon, 
  Newspaper, 
  Settings, 
  LogOut,
  Menu,
  School,
  Activity,
  Star,
  Quote,
  BookOpen,
  Building2
} from 'lucide-react'
import { useState } from 'react'
import { logout } from './login/actions'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Hero Banner', href: '/admin/hero', icon: ImageIcon },
  { name: 'Programs', href: '/admin/programs', icon: BookOpen },
  { name: 'Facilities', href: '/admin/facilities', icon: Building2 },
  { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
  { name: 'News & Berita', href: '/admin/news', icon: FileText },
  { name: 'Profil & Visi Misi', href: '/admin/profil', icon: LayoutDashboard },
  { name: 'Site Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden text-black">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/80 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-72 shrink-0 bg-emerald-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto
        flex flex-col h-full
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex h-16 shrink-0 items-center px-6 bg-emerald-950 border-b border-emerald-800">
          <School className="w-8 h-8 text-emerald-400 mr-3" />
          <span className="text-lg font-bold font-serif whitespace-nowrap">MA Nurul Falah CMS</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <div className="text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-4 px-3">
            Management
          </div>
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-emerald-800 text-white' 
                    : 'text-emerald-100 hover:bg-emerald-800/50 hover:text-white'
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? 'text-emerald-400' : 'text-emerald-300 group-hover:text-emerald-200'}`} aria-hidden="true" />
                {item.name}
              </Link>
            )
          })}
        </nav>
        
        <div className="p-4 bg-emerald-950 border-t border-emerald-800">
          <form action={logout}>
            <button
              type="submit"
              className="group flex w-full items-center px-3 py-2.5 text-sm font-medium rounded-lg text-emerald-100 hover:bg-emerald-800/50 hover:text-white transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5 flex-shrink-0 text-emerald-300 group-hover:text-emerald-200" aria-hidden="true" />
              Sign out
            </button>
          </form>
        </div>
      </div>

      {/* Main Content Space */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <div className="sticky top-0 z-10 flex h-16 shrink-0 bg-white shadow-sm border-b border-gray-200">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500 lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex flex-1 items-center">
               <h1 className="text-xl font-semibold text-gray-900 hidden sm:block">Dashboard</h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                  A
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Child Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50/50">
          {children}
        </main>
      </div>
    </div>
  )
}
