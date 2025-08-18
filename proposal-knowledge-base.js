// FSE Digital Proposal Assistant - Knowledge Base & Configuration
// This file contains the complete proposal content and assistant boundaries

const FSEProposalKnowledgeBase = {
    // Core Assistant Configuration
    config: {
        name: "FSE Digital Proposal Assistant",
        version: "1.0.0",
        model: "proposal-specific",
        maxResponseLength: 200,
        confidenceThreshold: 0.75,
        conversationMemory: 5,
        responseDelay: 500, // milliseconds
    },

    // Strict Boundaries and Limitations
    boundaries: {
        canDiscuss: [
            "ROI calculations and financial projections",
            "Implementation timeline and phases",
            "Tool recommendations and pricing",
            "Department-specific benefits",
            "Current state analysis",
            "Transformation strategy",
            "Risk management approaches",
            "Compliance framework",
            "Next steps and immediate actions"
        ],
        cannotDiscuss: [
            "Pricing negotiations or custom quotes",
            "Contractual commitments",
            "Legal or compliance advice",
            "Confidential company data",
            "Employee or hiring decisions",
            "Competitive analysis",
            "Real-time FSE Digital metrics",
            "Information outside the proposal"
        ],
        escalationPhrases: [
            "For detailed discussions, please contact our transformation team",
            "This requires a personalized consultation with our experts",
            "Let's schedule a meeting to discuss this in detail",
            "Our team can provide specific guidance on this topic"
        ]
    },

    // Proposal Content Sections
    content: {
        executiveSummary: {
            currentRevenue: "£520K",
            growthTarget: "£2-3M by 2030",
            projectedAnnualBenefit: "£25K-£55K",
            roiRange: "70-130%",
            keyRecommendation: "Create Director of AI and Marketing Operations role",
            summary: "FSE Digital's AI transformation strategy aims to achieve £2-3M revenue by 2030 through systematic AI integration, delivering 70-130% ROI with annual benefits of £25K-£55K."
        },

        currentState: {
            revenue: "£520K annually",
            staff: "12 employees",
            departments: ["SEO", "PPC", "Content", "Development", "Sales"],
            painPoints: [
                "Manual processes across departments",
                "Dependency on contractors (£35K annually)",
                "Inconsistent quality control",
                "Limited automation",
                "Resource constraints"
            ],
            softwareStack: [
                "SEMrush",
                "Google Ads",
                "Google Analytics",
                "Microsoft Office",
                "Various department-specific tools"
            ]
        },

        roiCalculation: {
            investment: {
                annual: "£20,000 - £25,000",
                breakdown: {
                    "ChatGPT Team": "£300/month (£3,600/year)",
                    "Surfer SEO Scale": "£299/month (£3,588/year)",
                    "Optmyzr": "£500/month (£6,000/year)",
                    "Monday CRM": "£300/month (£3,600/year)",
                    "Agency Analytics": "£100/month (£1,200/year)",
                    "Training & Setup": "£2,000 - £7,000"
                }
            },
            savings: {
                annual: "£55,000 - £85,000",
                breakdown: {
                    "PPC Cost Reduction": "30-50% (£15,000 - £25,000)",
                    "Content Optimization": "30-40% (£10,000 - £15,000)",
                    "Contractor Reduction": "50-70% (£17,500 - £25,000)",
                    "Efficiency Gains": "20-30% (£10,000 - £15,000)",
                    "Retainer Recovery": "£2,500/month (£30,000/year)"
                }
            },
            calculation: "ROI = (Annual Savings - Annual Investment) / Annual Investment × 100 = 70-130%"
        },

        implementationTimeline: {
            phase1: {
                name: "Foundation (Months 1-2)",
                activities: [
                    "Deploy ChatGPT Team",
                    "Basic AI training",
                    "Process documentation"
                ],
                expectedSavings: "£250/month"
            },
            phase2: {
                name: "Process Integration (Month 3)",
                activities: [
                    "Deploy Optmyzr for PPC",
                    "Enhance SEMrush workflows",
                    "Staff AI training"
                ],
                expectedSavings: "£500/month"
            },
            phase3: {
                name: "Content Scaling (Months 4-5)",
                activities: [
                    "Implement Surfer SEO Scale",
                    "Automate content workflows",
                    "Quality frameworks"
                ],
                expectedSavings: "£2,000/month"
            },
            phase4: {
                name: "Full Automation (Months 6-9)",
                activities: [
                    "Deploy Monday CRM",
                    "Integrate Agency Analytics",
                    "Advanced automation"
                ],
                expectedSavings: "£3,500/month"
            },
            phase5: {
                name: "Optimization (Months 10-12)",
                activities: [
                    "Refine all processes",
                    "Scale successful initiatives",
                    "Prepare for growth"
                ],
                expectedSavings: "£4,500/month"
            }
        },

        toolRecommendations: {
            "ChatGPT Team": {
                purpose: "Core AI assistant for all departments",
                cost: "£300/month",
                benefits: "40% time savings on routine tasks",
                departments: ["All"]
            },
            "Surfer SEO Scale": {
                purpose: "AI-powered content optimization",
                cost: "£299/month",
                benefits: "3x content output, improved rankings",
                departments: ["SEO", "Content"]
            },
            "Optmyzr": {
                purpose: "PPC automation and optimization",
                cost: "£500/month",
                benefits: "30-50% cost reduction, 2x efficiency",
                departments: ["PPC"]
            },
            "Monday CRM": {
                purpose: "Client and project management",
                cost: "£300/month",
                benefits: "50% faster project delivery",
                departments: ["Sales", "Project Management"]
            },
            "Agency Analytics": {
                purpose: "Automated reporting and analytics",
                cost: "£100/month",
                benefits: "80% reduction in reporting time",
                departments: ["All"]
            }
        },

        departmentBenefits: {
            SEO: {
                currentChallenges: "Manual keyword research, slow content optimization",
                aiSolution: "Automated research, AI content optimization",
                expectedBenefit: "300% productivity increase",
                tools: ["ChatGPT Team", "Surfer SEO Scale", "SEMrush AI"]
            },
            PPC: {
                currentChallenges: "Manual bid management, time-intensive optimization",
                aiSolution: "Automated bidding, AI-driven optimization",
                expectedBenefit: "30-50% cost reduction",
                tools: ["Optmyzr", "ChatGPT Team"]
            },
            Content: {
                currentChallenges: "Limited output, quality inconsistency",
                aiSolution: "AI-assisted writing, automated quality checks",
                expectedBenefit: "3x content output",
                tools: ["ChatGPT Team", "Surfer SEO Scale"]
            },
            Development: {
                currentChallenges: "Repetitive coding tasks, debugging time",
                aiSolution: "AI code generation, automated testing",
                expectedBenefit: "40% faster development",
                tools: ["ChatGPT Team", "GitHub Copilot"]
            },
            Sales: {
                currentChallenges: "Manual lead qualification, slow proposals",
                aiSolution: "AI lead scoring, automated proposals",
                expectedBenefit: "50% faster sales cycle",
                tools: ["Monday CRM", "ChatGPT Team"]
            }
        },

        riskManagement: {
            identifiedRisks: [
                {
                    risk: "AI adoption resistance",
                    mitigation: "Phased implementation, comprehensive training"
                },
                {
                    risk: "Quality control concerns",
                    mitigation: "Human-in-the-loop validation, quality frameworks"
                },
                {
                    risk: "Data security",
                    mitigation: "Enterprise-grade tools, GDPR compliance"
                },
                {
                    risk: "Over-dependence on AI",
                    mitigation: "Maintain human expertise, regular audits"
                }
            ],
            goNoGo: "Quarterly review gates with clear success metrics"
        },

        nextSteps: {
            week1: [
                "Executive approval",
                "Form AI transformation committee",
                "Audit current processes"
            ],
            week2: [
                "Deploy ChatGPT Team",
                "Begin staff training",
                "Document baseline metrics"
            ],
            week3: [
                "Select pilot projects",
                "Implement first automations",
                "Measure initial results"
            ],
            week4: [
                "Review pilot outcomes",
                "Refine approach",
                "Plan Phase 2 rollout"
            ]
        }
    },

    // Pre-configured Responses
    responses: {
        outOfScope: "That's beyond this proposal's scope. For detailed discussions, please schedule a meeting with our transformation team.",
        
        greeting: "Hello! I'm your AI assistant for understanding FSE Digital's transformation strategy. I can explain our ROI projections, implementation timeline, tool recommendations, and answer any questions about the proposal. What would you like to know?",
        
        noAnswer: "I don't have specific information about that in the proposal. Would you like to know about our ROI projections, implementation timeline, or tool recommendations instead?",
        
        clarification: "Could you please clarify your question? I can help with topics like ROI calculations, implementation phases, tool recommendations, or department benefits.",
        
        contactTeam: "For that level of detail, I recommend scheduling a consultation with our transformation team. They can provide personalized guidance for your specific needs."
    }
};

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FSEProposalKnowledgeBase;
}