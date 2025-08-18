// FSE Digital Proposal Assistant - Main JavaScript Implementation

class ProposalAssistant {
    constructor() {
        this.kb = FSEProposalKnowledgeBase;
        this.conversationHistory = [];
        this.isOpen = false;
        this.isTyping = false;
        this.messageIdCounter = 0;
        
        this.initializeElements();
        this.attachEventListeners();
        this.loadConversationState();
    }

    initializeElements() {
        this.elements = {
            widget: document.getElementById('fse-chat-widget'),
            toggle: document.getElementById('chat-toggle'),
            container: document.getElementById('chat-container'),
            close: document.getElementById('chat-close'),
            messages: document.getElementById('chat-messages'),
            form: document.getElementById('chat-form'),
            input: document.getElementById('chat-input'),
            submit: document.querySelector('.chat-submit'),
            typingIndicator: document.getElementById('typing-indicator'),
            announcements: document.getElementById('chat-announcements')
        };
    }

    attachEventListeners() {
        // Toggle chat
        this.elements.toggle.addEventListener('click', () => this.toggleChat());
        this.elements.close.addEventListener('click', () => this.closeChat());
        
        // Form submission
        this.elements.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleUserMessage();
        });
        
        // Quick action buttons
        document.querySelectorAll('.quick-action').forEach(button => {
            button.addEventListener('click', () => {
                const question = button.getAttribute('data-question');
                this.elements.input.value = question;
                this.handleUserMessage();
            });
        });
        
        // Keyboard accessibility
        this.elements.input.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeChat();
            }
        });
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        this.isOpen = true;
        this.elements.container.classList.remove('hidden');
        this.elements.input.focus();
        this.announce('Chat assistant opened');
        
        // Track engagement
        this.trackEvent('chat_opened');
    }

    closeChat() {
        this.isOpen = false;
        this.elements.container.classList.add('hidden');
        this.announce('Chat assistant closed');
        
        // Track engagement
        this.trackEvent('chat_closed');
    }

    handleUserMessage() {
        const message = this.elements.input.value.trim();
        if (!message || this.isTyping) return;
        
        // Clear input
        this.elements.input.value = '';
        
        // Add user message to chat
        this.addMessage(message, 'user');
        
        // Process and respond
        this.processUserQuery(message);
    }

    async processUserQuery(query) {
        this.showTypingIndicator();
        
        // Check for boundary violations first
        const boundaryCheck = this.checkBoundaries(query);
        if (boundaryCheck) {
            setTimeout(() => {
                this.hideTypingIndicator();
                this.addMessage(boundaryCheck, 'assistant');
            }, this.kb.config.responseDelay);
            return;
        }
        
        // Find relevant response
        const response = this.findBestResponse(query);
        
        // Simulate processing delay for natural feel
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addMessage(response.text, 'assistant', response.citation);
            
            // Track query type
            this.trackEvent('query_processed', { type: response.type });
        }, this.kb.config.responseDelay);
    }

    checkBoundaries(query) {
        const lowerQuery = query.toLowerCase();
        
        // Check for negotiation attempts
        const negotiationKeywords = ['negotiate', 'discount', 'better price', 'lower cost', 'deal', 'custom quote'];
        if (negotiationKeywords.some(keyword => lowerQuery.includes(keyword))) {
            return this.kb.responses.contactTeam;
        }
        
        // Check for legal/contractual queries
        const legalKeywords = ['contract', 'legal', 'agreement', 'terms and conditions', 'liability'];
        if (legalKeywords.some(keyword => lowerQuery.includes(keyword))) {
            return "I cannot provide legal or contractual advice. Please consult with our legal team for these matters.";
        }
        
        // Check for confidential data requests
        const confidentialKeywords = ['client list', 'customer data', 'employee', 'salary', 'confidential'];
        if (confidentialKeywords.some(keyword => lowerQuery.includes(keyword))) {
            return "I cannot share confidential company information. This proposal focuses on our transformation strategy.";
        }
        
        return null;
    }

    findBestResponse(query) {
        const lowerQuery = query.toLowerCase();
        
        // ROI and Financial Queries
        if (this.matchesPattern(lowerQuery, ['roi', 'return', 'investment', '70', '130', 'percent'])) {
            return {
                text: this.formatROIResponse(),
                citation: "Investment Analysis Section",
                type: 'financial'
            };
        }
        
        // Implementation Timeline
        if (this.matchesPattern(lowerQuery, ['timeline', 'phase', 'month', 'implementation', 'when', 'schedule'])) {
            return {
                text: this.formatTimelineResponse(lowerQuery),
                citation: "Implementation Roadmap",
                type: 'timeline'
            };
        }
        
        // Tool Recommendations
        if (this.matchesPattern(lowerQuery, ['tool', 'software', 'recommend', 'chatgpt', 'surfer', 'optmyzr', 'monday', 'analytics'])) {
            return {
                text: this.formatToolResponse(lowerQuery),
                citation: "Tool Recommendations Section",
                type: 'tools'
            };
        }
        
        // Department Benefits
        if (this.matchesPattern(lowerQuery, ['seo', 'ppc', 'content', 'development', 'sales', 'department', 'benefit'])) {
            return {
                text: this.formatDepartmentResponse(lowerQuery),
                citation: "Department Benefits Analysis",
                type: 'departments'
            };
        }
        
        // Savings and Costs
        if (this.matchesPattern(lowerQuery, ['cost', 'save', 'saving', 'expense', 'budget', 'price', 'invest'])) {
            return {
                text: this.formatCostResponse(),
                citation: "Investment & Savings Analysis",
                type: 'financial'
            };
        }
        
        // Risk Management
        if (this.matchesPattern(lowerQuery, ['risk', 'concern', 'challenge', 'mitigation', 'problem'])) {
            return {
                text: this.formatRiskResponse(),
                citation: "Risk Management Framework",
                type: 'risk'
            };
        }
        
        // Next Steps
        if (this.matchesPattern(lowerQuery, ['next', 'start', 'begin', 'immediate', 'action', 'step'])) {
            return {
                text: this.formatNextStepsResponse(),
                citation: "Immediate Next Steps",
                type: 'action'
            };
        }
        
        // Current State
        if (this.matchesPattern(lowerQuery, ['current', 'now', 'existing', 'problem', 'pain point'])) {
            return {
                text: this.formatCurrentStateResponse(),
                citation: "Current State Analysis",
                type: 'analysis'
            };
        }
        
        // Default response
        return {
            text: this.kb.responses.noAnswer,
            citation: null,
            type: 'default'
        };
    }

    matchesPattern(query, keywords) {
        return keywords.some(keyword => query.includes(keyword));
    }

    formatROIResponse() {
        const roi = this.kb.content.roiCalculation;
        return `Our ${roi.calculation.split('=')[1].trim()} ROI projection is based on:\n\n` +
               `• Annual investment: ${roi.investment.annual}\n` +
               `• Projected savings: ${roi.savings.annual}\n` +
               `• Key drivers: PPC cost reduction (30-50%), content optimization (30-40%), and contractor reduction (50-70%)\n\n` +
               `The calculation: Annual Savings (£55-85K) minus Investment (£20-25K) divided by Investment = 70-130% ROI`;
    }

    formatTimelineResponse(query) {
        const timeline = this.kb.content.implementationTimeline;
        
        // Check for specific month queries
        if (query.includes('month 1') || query.includes('month 2')) {
            return `${timeline.phase1.name}:\n` +
                   timeline.phase1.activities.map(a => `• ${a}`).join('\n') +
                   `\nExpected savings: ${timeline.phase1.expectedSavings}`;
        }
        
        if (query.includes('month 3')) {
            return `${timeline.phase2.name}:\n` +
                   timeline.phase2.activities.map(a => `• ${a}`).join('\n') +
                   `\nExpected savings: ${timeline.phase2.expectedSavings}`;
        }
        
        // General timeline overview
        return "Our 12-month implementation timeline:\n\n" +
               `• Months 1-2: Foundation - ${timeline.phase1.expectedSavings}\n` +
               `• Month 3: Process Integration - ${timeline.phase2.expectedSavings}\n` +
               `• Months 4-5: Content Scaling - ${timeline.phase3.expectedSavings}\n` +
               `• Months 6-9: Full Automation - ${timeline.phase4.expectedSavings}\n` +
               `• Months 10-12: Optimization - ${timeline.phase5.expectedSavings}`;
    }

    formatToolResponse(query) {
        const tools = this.kb.content.toolRecommendations;
        
        // Check for specific tool queries
        for (const [toolName, toolData] of Object.entries(tools)) {
            if (query.toLowerCase().includes(toolName.toLowerCase().split(' ')[0])) {
                return `${toolName}:\n` +
                       `• Purpose: ${toolData.purpose}\n` +
                       `• Cost: ${toolData.cost}\n` +
                       `• Benefits: ${toolData.benefits}\n` +
                       `• Departments: ${toolData.departments.join(', ')}`;
            }
        }
        
        // General tools overview
        return "Recommended AI tools:\n\n" +
               Object.entries(tools).map(([name, data]) => 
                   `• ${name}: ${data.cost} - ${data.benefits}`
               ).join('\n');
    }

    formatDepartmentResponse(query) {
        const departments = this.kb.content.departmentBenefits;
        
        // Check for specific department
        for (const [dept, data] of Object.entries(departments)) {
            if (query.toLowerCase().includes(dept.toLowerCase())) {
                return `${dept} Department Benefits:\n\n` +
                       `Current challenges: ${data.currentChallenges}\n\n` +
                       `AI solution: ${data.aiSolution}\n\n` +
                       `Expected benefit: ${data.expectedBenefit}\n\n` +
                       `Tools: ${data.tools.join(', ')}`;
            }
        }
        
        // General department overview
        return "Department-specific benefits:\n\n" +
               Object.entries(departments).map(([dept, data]) => 
                   `• ${dept}: ${data.expectedBenefit}`
               ).join('\n');
    }

    formatCostResponse() {
        const roi = this.kb.content.roiCalculation;
        return `Investment & Savings Overview:\n\n` +
               `Total Annual Investment: ${roi.investment.annual}\n\n` +
               `Tool Costs:\n` +
               Object.entries(roi.investment.breakdown).map(([tool, cost]) => 
                   `• ${tool}: ${cost}`
               ).join('\n') +
               `\n\nProjected Annual Savings: ${roi.savings.annual}\n\n` +
               `Savings Breakdown:\n` +
               Object.entries(roi.savings.breakdown).map(([category, saving]) => 
                   `• ${category}: ${saving}`
               ).join('\n');
    }

    formatRiskResponse() {
        const risks = this.kb.content.riskManagement;
        return "Risk Management Strategy:\n\n" +
               risks.identifiedRisks.map(r => 
                   `• ${r.risk}\n  Mitigation: ${r.mitigation}`
               ).join('\n\n') +
               `\n\n${risks.goNoGo}`;
    }

    formatNextStepsResponse() {
        const steps = this.kb.content.nextSteps;
        return "Immediate Next Steps:\n\n" +
               `Week 1:\n${steps.week1.map(s => `• ${s}`).join('\n')}\n\n` +
               `Week 2:\n${steps.week2.map(s => `• ${s}`).join('\n')}\n\n` +
               `Week 3:\n${steps.week3.map(s => `• ${s}`).join('\n')}\n\n` +
               `Week 4:\n${steps.week4.map(s => `• ${s}`).join('\n')}`;
    }

    formatCurrentStateResponse() {
        const current = this.kb.content.currentState;
        return `Current State Overview:\n\n` +
               `• Revenue: ${current.revenue}\n` +
               `• Staff: ${current.staff}\n` +
               `• Key Pain Points:\n${current.painPoints.map(p => `  - ${p}`).join('\n')}\n\n` +
               `Our AI transformation addresses these challenges through systematic automation and optimization.`;
    }

    addMessage(text, sender, citation = null) {
        const messageId = `msg-${++this.messageIdCounter}`;
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.id = messageId;
        
        // Create avatar
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.textContent = sender === 'user' ? 'U' : '🤖';
        
        // Create content
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        // Format text with line breaks
        const formattedText = text.split('\n').map(line => {
            if (line.trim()) {
                const p = document.createElement('p');
                p.textContent = line;
                return p;
            }
            return null;
        }).filter(p => p);
        
        formattedText.forEach(p => contentDiv.appendChild(p));
        
        // Add citation if provided
        if (citation) {
            const citationDiv = document.createElement('div');
            citationDiv.className = 'message-citation';
            citationDiv.textContent = `📍 ${citation}`;
            contentDiv.appendChild(citationDiv);
        }
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        // Remove quick actions if they exist
        const quickActions = this.elements.messages.querySelector('.quick-actions');
        if (quickActions && sender === 'user') {
            quickActions.remove();
        }
        
        this.elements.messages.appendChild(messageDiv);
        
        // Scroll to bottom
        this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
        
        // Announce for accessibility
        this.announce(`${sender === 'user' ? 'You' : 'Assistant'}: ${text}`);
        
        // Save to history
        this.conversationHistory.push({ sender, text, timestamp: Date.now() });
        this.saveConversationState();
        
        // Limit conversation history
        if (this.conversationHistory.length > this.kb.config.conversationMemory * 2) {
            this.conversationHistory = this.conversationHistory.slice(-this.kb.config.conversationMemory * 2);
        }
    }

    showTypingIndicator() {
        this.isTyping = true;
        this.elements.typingIndicator.classList.remove('hidden');
        this.elements.submit.disabled = true;
        this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
    }

    hideTypingIndicator() {
        this.isTyping = false;
        this.elements.typingIndicator.classList.add('hidden');
        this.elements.submit.disabled = false;
    }

    announce(message) {
        this.elements.announcements.textContent = message;
    }

    trackEvent(eventName, data = {}) {
        // Analytics tracking placeholder
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: 'Proposal Assistant',
                ...data
            });
        }
        
        // Console logging for debugging
        console.log(`[FSE Assistant] Event: ${eventName}`, data);
    }

    saveConversationState() {
        try {
            sessionStorage.setItem('fse_chat_history', JSON.stringify(this.conversationHistory));
        } catch (e) {
            console.error('Failed to save conversation state:', e);
        }
    }

    loadConversationState() {
        try {
            const saved = sessionStorage.getItem('fse_chat_history');
            if (saved) {
                this.conversationHistory = JSON.parse(saved);
            }
        } catch (e) {
            console.error('Failed to load conversation state:', e);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.fseAssistant = new ProposalAssistant();
    
    // Log initialization
    console.log('[FSE Assistant] Initialized successfully');
    console.log('[FSE Assistant] Knowledge base loaded:', FSEProposalKnowledgeBase.config.name);
});