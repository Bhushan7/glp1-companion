'use client'

import { useState, useEffect } from 'react'

const SAMPLE_INSIGHTS = [
  {
    id: 1,
    user: 'Week 1 · Zepbound',
    summary:
      'Weight moved from 95.5kg to 91.9kg in your first week — a meaningful start. Nausea and stomach pain correlated with alcohol and fried food days. Protein averaged 76g against a 96g target.',
    full: `This has been your very first week on Zepbound, and you've shown real commitment by logging every single day. Your weight has moved from 95.5kg down to 91.9kg, which is a meaningful shift as your body begins responding to the medication. Your hydration has been solid throughout, ranging between 100 and 120 ounces daily, and your energy levels have fluctuated quite a bit, from highs of 4 out of 5 down to just 1 out of 5 today. Starting a new medication is a big adjustment, and the fact that you're tracking so consistently gives you a strong foundation to build on.

Looking at your side effects alongside your food choices, there's a noticeable pattern emerging. On days when you had alcohol, fried foods, or processed foods, you experienced more intense symptoms like nausea, stomach pain, and very low energy. Your injection times have also varied widely, from 10:30 in the morning to 22:05 at night. This inconsistency can make it harder for your body to settle into a rhythm. For the coming week, try to inject at roughly the same time each week and consider reducing fried and processed foods to see if your GI symptoms ease.

Your average protein intake this week was 76 grams, which falls about 20 grams short of your 96 gram daily target. Because GLP-1 medications suppress appetite so effectively, there's a real risk of losing muscle along with fat if protein intake stays low. For next week, your single focus should be choosing one high-protein, easy-to-eat food you can rely on when your appetite is low — something like a ready-made protein shake or cottage cheese — and having it available every day.`,
  },
  {
    id: 2,
    user: 'Week 3 · Ozempic',
    summary:
      'Nausea dropped significantly after shifting injection to Friday morning. Energy stabilising at 3–4 out of 5. Protein at 68g against a 122g target — a gap worth closing.',
    full: `Three weeks in and your body is finding its rhythm on Ozempic. Your weight has moved from 102.1kg to 99.4kg, a steady and sustainable pace that reflects genuine metabolic change rather than water loss alone. You've been logging six out of seven days, which gives a reliable picture of how the medication is working for you. Your energy has stabilised compared to week one, mostly landing between 3 and 4 out of 5, and your hydration has improved noticeably from your baseline.

The side effect picture this week is encouraging. Nausea dropped off significantly after you shifted your injection from Thursday evening to Friday morning, and the two days you reported bloating both followed higher-carb meals. This kind of pattern is worth holding onto — your body is telling you something consistent and actionable. Fatty or heavily processed meals still carry some GI risk at your current dose, so continuing to favour lighter proteins and cooked vegetables around injection day will likely keep symptoms manageable as you escalate to 1mg next month.

Protein averaged 68 grams this week against a target of 122 grams for your body weight. The two days you hit above 90 grams were both days you had Greek yogurt at breakfast, which suggests a simple morning anchor habit could do a lot of the work here. For next week, the one thing to focus on is adding a protein source at breakfast every single day — even something as small as two eggs or a yogurt — before appetite suppression kicks in later in the day.`,
  },
  {
    id: 3,
    user: 'Week 7 · Wegovy',
    summary:
      'Down 8.3kg total. Lowest energy days matched nights under 50g protein and under 6 hours sleep. Side effects minimal — best week yet. Protein closing in on target.',
    full: `You've now completed seven weeks on Wegovy and your cumulative progress is significant: down 8.3kg from your starting weight of 118kg, with the pace of loss holding steady rather than stalling. This week's logs show weight ranging from 109.9kg to 109.2kg, which looks like a plateau on the surface but is actually consistent with your body recomposing after the faster early losses. Your energy scores this week averaged 3.6 out of 5, your best weekly average yet, and hydration has been excellent at 110 to 130 ounces daily.

One pattern stands out this week: your two lowest energy days, Tuesday and Thursday, both followed evenings where you logged under 50 grams of protein and sleep under six hours. Your side effects have been minimal this week — just mild nausea on dose day — which reflects how well you've dialled in injection timing and food choices over the past month. That consistency is real progress and worth acknowledging.

At seven weeks your protein average of 84 grams is closer to your 142 gram target than it was in week one, but there's still a meaningful gap. The muscle preservation stakes get higher as total weight lost increases, so the next four weeks are a critical window. Your focus for next week is to protect sleep on dose night specifically — aim for seven hours on Wednesday — and add one protein-forward snack in the afternoon on days when dinner tends to be lighter. A handful of edamame or a small tin of tuna takes under two minutes and adds 15 to 20 grams.`,
  },
]

interface Insight {
  id: number
  user: string
  summary: string
  full: string
}

interface CardProps {
  insight: Insight
  isExpanded: boolean
  onExpand: (e: React.MouseEvent) => void
  onCollapse: (e: React.MouseEvent) => void
}

function InsightCard({ insight, isExpanded, onExpand, onCollapse }: CardProps) {
  return (
    <div
      className={`relative bg-white border rounded-xl p-6 shadow-sm flex-shrink-0 flex flex-col gap-3 transition-all duration-300 ${
        isExpanded
          ? 'w-[300px] sm:w-[520px] z-20 shadow-xl border-[#1D9E75]/40 cursor-default'
          : 'w-[280px] sm:w-[360px] border-gray-100 hover:shadow-md hover:border-gray-200 cursor-pointer'
      }`}
      onClick={isExpanded ? undefined : onExpand}
    >
      {isExpanded && (
        <button
          className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 text-sm rounded-full hover:bg-gray-100 transition-colors"
          onClick={onCollapse}
          aria-label="Close insight"
        >
          ✕
        </button>
      )}

      <span className="self-start bg-[#E3F5EE] text-[#1D9E75] text-xs font-medium px-2 py-0.5 rounded-full">
        {insight.user}
      </span>

      {isExpanded ? (
        <div className="space-y-4 pr-4">
          {insight.full
            .trim()
            .split('\n\n')
            .map((para, i) => (
              <p key={i} className="text-sm text-gray-700 leading-relaxed">
                {para}
              </p>
            ))}
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{insight.summary}</p>
          <span className="text-xs text-[#1D9E75] font-medium mt-auto">Read full insight →</span>
        </>
      )}
    </div>
  )
}

export default function InsightCarousel() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  const isAnimationPaused = isHovered || expandedIdx !== null

  useEffect(() => {
    if (expandedIdx === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpandedIdx(null)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [expandedIdx])

  const doubled = [...SAMPLE_INSIGHTS, ...SAMPLE_INSIGHTS]

  return (
    <>
      {expandedIdx !== null && (
        <div className="fixed inset-0 z-10" onClick={() => setExpandedIdx(null)} />
      )}

      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What your AI health coach actually says
          </h2>
          <p className="text-lg text-gray-500">
            Real insights generated from real user data. Personalised every week.
          </p>
        </div>

        <div className="[overflow-x:clip]">
          <div
            className={`flex gap-6 py-4 animate-ticker${isAnimationPaused ? ' [animation-play-state:paused]' : ''}`}
            style={{ width: 'max-content' }}
          >
            {doubled.map((insight, idx) => (
              <InsightCard
                key={`${insight.id}-${idx}`}
                insight={insight}
                isExpanded={expandedIdx === idx}
                onExpand={(e) => {
                  e.stopPropagation()
                  setExpandedIdx(idx)
                }}
                onCollapse={(e) => {
                  e.stopPropagation()
                  setExpandedIdx(null)
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
