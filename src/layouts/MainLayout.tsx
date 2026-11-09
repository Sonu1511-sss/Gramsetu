import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { GlobalSearchModal } from '../components/common/GlobalSearchModal';

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col font-sans text-[#17212B]">
      <div className="flex flex-1 relative">
        {/* Responsive Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content Area */}
        <div
          className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-[72px]' : 'lg:pl-[260px]'
            }`}
        >
          {/* Sticky Top Navbar */}
          <Navbar
            onToggleSidebar={() => setSidebarOpen(true)}
            onOpenSearch={() => setSearchOpen(true)}
          />

          {/* Centered Main Page Container */}
          <main className="flex-1 w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-8 animate-fade-in">
            <Outlet />
          </main>

          {/* Clean Government Style Footer */}
          <footer className="border-t border-[#E4E7EC] bg-white py-4 px-4 sm:px-6 lg:px-8 text-xs text-[#667085]">
            <div className="max-w-[1500px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-[#17212B]">GramSetu</span>
                <span className="text-gray-300">•</span>
                <span>Panchayat ka har kaam, ek digital platform par.</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-[#667085]">
                <span>Gram Panchayat Rampur, Waraseoni, Balaghat (M.P.)</span>
                <span>•</span>
                <span className="font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Demo Presentation Mode
                </span>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Global Search Modal */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
