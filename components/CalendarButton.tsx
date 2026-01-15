'use client'

interface CalendarButtonProps {
  title?: string
  startTime?: string
  endTime?: string
  location?: string
  description?: string
}

export default function CalendarButton({ 
  title = "Culte MEESL",
  startTime = "2024-01-21T08:30:00",
  endTime = "2024-01-21T10:30:00",
  location = "4, Delmas 48, Haïti",
  description = "Culte dominical à MEESL"
}: CalendarButtonProps) {
  
  const createGoogleCalendarUrl = () => {
    const startDate = new Date(startTime).toISOString().replace(/-|:|\.\d\d\d/g, '')
    const endDate = new Date(endTime).toISOString().replace(/-|:|\.\d\d\d/g, '')
    
    const details = encodeURIComponent(description)
    const locationEncoded = encodeURIComponent(location)
    const titleEncoded = encodeURIComponent(title)
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${titleEncoded}&dates=${startDate}/${endDate}&details=${details}&location=${locationEncoded}`
  }

  const addToCalendar = () => {
    const calendarUrl = createGoogleCalendarUrl()
    window.open(calendarUrl, '_blank')
  }

  return (
    <button 
      onClick={addToCalendar}
      className="btn-secondary"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}
    >
      📅 Ajouter au calendrier
    </button>
  )
}
