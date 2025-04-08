export function SwingingBroom() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-pink-600 mb-4 text-center">The Swinging Broom Incident</h3>

      {/* Image placeholder with empty src for user to fill in */}
      <div className="rounded-lg overflow-hidden mb-3">
        <div className="aspect-w-16 aspect-h-9">
          <img src="./mp-a4c5b652-tProduct_mainImage.png" alt="Swinging Broom Incident" className="w-full h-full object-cover rounded-lg" />
        </div>
      </div>

      <div className="text-center mt-3">
        <p className="font-medium text-gray-800">
          Me: trying to explain what a Schwingbesen is…
          <br />
          Google: "Swinging Broom" 💀
          <br />
          Us: uncontrollable laughter for 20 minutes 😂
        </p>
      </div>
    </div>
  )
}
