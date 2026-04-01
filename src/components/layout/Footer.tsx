import { Flame } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 bg-bleu-republic rounded">
            <Flame size={12} className="text-white" />
          </div>
          <span className="font-semibold text-gray-700">AGORA 2026</span>
          <span className="text-gray-400">— La démocratie éclairée</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-gray-800 transition-colors">Méthode</a>
          <a href="#" className="hover:text-gray-800 transition-colors">Mentions légales</a>
          <a href="https://github.com/seb91140/agora-2026" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  )
}
