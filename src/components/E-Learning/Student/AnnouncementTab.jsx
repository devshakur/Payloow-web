import { motion } from 'framer-motion'


export default function AnnouncementTab({ announcements }) {


  const announcementVariant = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto' },
  }




  return (
    <div className="message-container space-y-4">
      {announcements && announcements.length > 0 ? (
        <>
          {announcements.map((announcement) => (
            <motion.div
              key={announcement._id}
              className="message-block bg-white shadow-md rounded-lg p-4"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={announcementVariant}
            >
              <div className='pl-2 space-y-2'>

                <p className='font-semibold textlg'>
                  {announcement.title}
                </p>
                <p className=''>
                  {announcement.description}
                </p>
              </div>

            </motion.div>
          ))}
        </>
      ) : (
        <>
          <p className="text-gray-600">No announcement for this course yet ....</p>
        </>
      )}
    </div>
  )
}