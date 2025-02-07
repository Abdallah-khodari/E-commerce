
export default function Footer() {
  return (
    <div>
<footer class="bg-gray-100 py-6 mt-8">
  <div class="container mx-auto px-4 text-center">
     {/* App Link Section  */}
    <p class="text-lg font-medium mb-4">Get the FreshCart app</p>
    <p class="text-sm text-gray-600 mb-6">
      We will send you a link, open it on your phone to download the app.
    </p>
    <div class="flex justify-center items-center space-x-2 mb-6">
      <input
        type="email"
        placeholder="Email .."
        class="border border-gray-300 rounded-l-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button class="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600">
        Share App Link
      </button>
    </div>

     {/* Payment Partners and Store Links  */}


    </div>
</footer>
    </div>
  )
}
