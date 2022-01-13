//
//  ViewController.swift
//  SkeduloCodePush
//
//  Created by Huy Vu on 11/01/2022.
//

import UIKit
import React

class ViewController: UIViewController {
    
    @IBOutlet weak var _nativeCountLabel: UILabel!
    static var shared:ViewController? = nil;

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        
        ViewController.shared = self;
    }

    @IBAction func onMexClicked(_ sender: Any) {

        let rootView = RCTRootView(bridge: AppDelegate.bridge, moduleName: "RNHighScores", initialProperties: nil)
        
        let vc = UIViewController()
        vc.modalPresentationStyle = .fullScreen

        vc.view = rootView
        
        SwiftPluginCall.sharedController = vc;
        
        self.present(vc, animated: true, completion: nil)
    }
    
    @IBAction func increaseCountToRN(_ sender: Any) {
        EventEmitter.sharedInstance.dispatch(name: "increaseCount", body: nil)
    }
    
    public func updateCount() {
        _nativeCountLabel.text = String(SwiftPluginCall.nativeCountData)
    }
}

