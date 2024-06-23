

export default async function NoResults() {
    const NO_RESULTS_TEXT = "¡No se encontraron resultados para esos criterios de búsqueda!"
    const SUGGESTION_TEXT = "Pruebe seleccionando otras categorías, o buscando algún otro término."
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center">
                <p className="text-xl font-bold text-lime-700">{NO_RESULTS_TEXT}</p>
                <p className="text-slate-700">{SUGGESTION_TEXT}</p>
            </div>
        </div>
    )
}