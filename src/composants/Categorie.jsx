import React from 'react'

function Categorie() {
  return (
    <>
     {/* Navigation */}
        <nav className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex items-center justify-between py-4">
              <li>
                <a href="#" className="text-gray-700 hover:text-emerald-800 font-medium transition-colors">
                  Parfums Dubai
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-emerald-800 font-medium transition-colors">
                  Collections Privées et Niches
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-emerald-800 font-medium transition-colors">
                  Exclusivité AK
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-emerald-800 font-medium transition-colors">
                  Parfums d'intérieur
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-emerald-800 font-medium transition-colors">
                  Récemment vu
                </a>
              </li>
            </ul>
          </div>
        </nav>
    </>
  )
}

export default Categorie