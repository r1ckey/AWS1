const ProgressManager = {
    // Save progress to localStorage
    updateStage(stageId, data) {
        const key = `aws_study_progress_${stageId}`;
        const current = this.getStageProgress(stageId);
        const updated = { ...current, ...data };
        localStorage.setItem(key, JSON.stringify(updated));
    },

    // Get progress for a specific stage
    getStageProgress(stageId) {
        const key = `aws_study_progress_${stageId}`;
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : { studyCompleted: false, quizScore: 0, lastScore: 0 };
    },

    // Get overall stats
    getOverallStats() {
        let totalPerfect = 0;
        let totalLearned = 0;
        for (let i = 0; i <= 12; i++) {
            const p = this.getStageProgress(i);
            if (p.quizScore === 100) totalPerfect++;
            else if (p.studyCompleted || p.quizScore > 0) totalLearned++;
        }
        return { totalPerfect, totalLearned };
    },

    // Get Evolution status (🐣 -> 👑)
    getEvolution(stageId) {
        const p = this.getStageProgress(stageId);
        if (p.quizScore === 100) {
            return { icon: '👑', class: 'perfect', label: '完璧' };
        } else if (p.quizScore >= 80) {
            return { icon: '🔥', class: 'pro', label: '習得' };
        } else if (p.studyCompleted) {
            return { icon: '🌱', class: 'learned', label: '学習中' };
        } else {
            return { icon: '🐣', class: 'begin', label: '未着手' };
        }
    }
};
